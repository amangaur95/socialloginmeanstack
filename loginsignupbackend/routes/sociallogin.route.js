const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/sociallogin', function(req,res){
    User.findOne({email:req.body.email})
    .exec(function(err,user){
        if(err){
            res.json({
                err:err
            })
        }
        if(!user){
            let token=req.body.token;
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                provider:req.body.provider,
                token:token,
                isVerified:true,
                sociallogin:true
            })
            newUser.save(function(err,created){
                if(err){
                    res.json({
                        err:err,
                        success:false,
                    })
                }
                else{
                    res.json({
                        code:200,
                        success:true,
                        token:token,
                        msg:"user created successfully"
                    })
                }
            })
        }
        else{
            let socialFlag = false;
            user.provider.forEach(element => {
              if(element === 'facebook' || element === 'google'){
                socialFlag=true
              }
            });
            if(socialFlag){
                res.json({
                    code:200,
                    success:true
                })
            }
            else{
                User.findOneAndUpdate({email:req.body.email},
                    {
                        $set:{
                            sociallogin:true
                        },
                        $push:{
                            provider:req.body.provider
                        }
                    }
                ).exec(function(err, updated){
                    if(err){
                        res.json({
                            err:err,
                            success:false
                        })
                    }
                    else{
                        res.json({
                            code:200,
                            success:true
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;