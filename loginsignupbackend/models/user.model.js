const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const user = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default:''
  },
  token: {
    type: String,
    default: ''
  },
  verifiedToken: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  clickStatus: {
    type: Number,
    default: 0
  },
  passwordResetToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: Number,
    default: 0
  },
  provider: {
    type: Array,
    default: ''
  },
  sociallogin: {
    type: Boolean,
    default: false
  },
  systemlogin: {
    type: Boolean,
    default: false
  }
});

user.pre('save', function (next) {
  var user = this;
  if(!this.password){
    next();
  }
  else{
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
  }
});

user.pre('findOneAndUpdate', function(next){
    const user=this.getUpdate().$set;
    if(!user.password){
      next();
    }
    else{
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
           next();
        });
    });
  }
})

user.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', user);