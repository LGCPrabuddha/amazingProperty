const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post("/register",function(req,res){
    const newUser = new User({
      userName:req.body.userName,
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    });
    console.log(req.body);
  
    User.saveUser(newUser,function(err,user){
      if (err) {
        res.json({state:false,msg:"data not inserted"});
      }
      if (user) {
        res.json({state:true,msg:"data inserted"});
      }
    });
  
  });

  router.post("/login",function(req,res){
    const email = req.body.email;
    const password = req.body.password;
  
    User.findByEmail(email,function(err,user){
      if (err) throw err;
  
      if (!user) {
        //console.log(user);
        res.json({state:false,msg:"No user Foun"});
      }
  
      User.passwordCheck(password,user.password,function(err,match){
        if (err) throw err;
  
        if (match) {
          // console.log("password ok");
          // console.log(user._id);
          // console.log(config.secret);
          // const token = jwt.sign(user, config.secret,{expiresIn:604800});
        const token = jwt.sign({id: user._id}, config.secret,{expiresIn:86400});
          res.json(
            {
              state:true,
              token:"JWT " + token,
              user:{
                id:user._id,
                name:user.name,
                userName:user.userName,
                email:user.email
              }
            })
        }
      });
  
    });
  
  });

module.exports = router;