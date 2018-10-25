const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const User = require('../models/user.model');

randomToken = randomstring.generate(30);

router.post('/forgotpassword', function(req,res){
    let email=req.body.email
    console.log(email)
    User.findOneAndUpdate({email:email},{$set:{
      passwordResetToken:randomToken,
      resetPasswordExpires:0
    }}).exec(function(err,updated){
      if(err){
        console.log(err)
      }
      else{
        console.log("Successfully updated")
      }
    })
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: ' ', //enter your gmail_id
          pass: ' ' //enter your password
        }
      });
      host="localhost:4200" 
      resetpasswordlink="http://"+host+"/passwordreset/"+randomToken;
      const mailOptions = {
        from: ' ', //enter your gmail_id
        to:email,
        subject: 'Please confirm account',
        text: 'Hello,<br> Please Click on the link to verify your email.<br><a href='+resetpasswordlink+'>Click here to verify</a><br>This link is expire after a single click',
      };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json({
            error:error,
            failuremessage:{msg1:'Unable to sent verification link to your email',msg2:'Something went wrong'}
          })
        } else {
          res.json({
            code:200,
            successmessage:{msg1:'Link is sent to your email',msg2:'Reset password'},
            info:info,
          })
        }
      }); 
})

module.exports = router;