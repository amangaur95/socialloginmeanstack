const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.post('/resetpassword', function(req,res){
    if(req.body.details.password === req.body.details.confirm_password){
        User.findOne({
            passwordResetToken:req.body.id
        }).exec(function(err,user){
            if(err){
                return res.json({
                    err:err,
                })
            }
            else{
                if(!user){
                    return res.json({
                        failuremessage:{msg1:'Unauthorized access/user',msg2:'Invalid Token'}
                    })
                }
                else{
                    if(user.resetPasswordExpires==0){
                        user.password=req.body.details.password,
                        user.resetPasswordExpires=1,
                        user.systemlogin=true,
                        user.save(function(err,data){
                            if(err){
                                res.json({
                                    err:err,
                                    success:false,
                                    failuremessage:{msg1:'Unable to reset password',msg2:'Something went wrong'}
                                })
                            }
                            else{
                                res.json({
                                    code:200,
                                    success:true,
                                    successmessage:{msg1:'Password Reset Successfully',msg2:'You can Login Now'}
                                })
                            }
                        })
                    }
                    else{
                        return res.json({
                            failuremessage:{msg1:'Linked Expired',msg2:''}
                        })
                    }
                }
            }
        })
    }
    else{
        res.json({
            code:401,
            failuremessage:{msg1:'Password Do Not Match', msg2:''}
        })
    }
})

module.exports = router;