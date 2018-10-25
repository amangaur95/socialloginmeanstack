const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/database');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginsignup = require('./routes/loginsignup.route');
const emailverify = require('./routes/emailverify.route');
const forgotpassword = require('./routes/forgotpassword.route');
const resetpassword = require('./routes/resetpassword.route');
const profile = require('./routes/profile.route');
const sociallogin = require('./routes/sociallogin.route');

const app = express();
mongoose.connect(config.database).then(
        () => {console.log('Database connected!!...') },
        err => { console.log('Can not connect to the database'+ err)}
      );
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginsignup);
app.use('/signup', loginsignup);
app.use('/verify', emailverify);
app.use('/forgotpassword', forgotpassword);
app.use('/resetpassword', resetpassword);
app.use('/profile', profile);
app.use('/sociallogin', sociallogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
