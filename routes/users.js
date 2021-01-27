var express = require('express');
var router = express.Router();
var Groupie = require('../models/user');

var tokenService = require('../services/bodygaurd');
var passwordService = require('../services/bouncer');


// route for user registration (Add User) -> /register
router.post('/signup', async (req, res, next) => {
  try{
    //console.log(req.body);
    let newGroupie = new Groupie({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordService.hashPassword(req.body.password)
    });
    //console.log(newGroupie)
    let result = await newGroupie.save();
    console.log(result);
    res.json({
      message: "User Successfully Created",
      status: 200
    })
  }
  catch(err){
    console.log(err);
    res.json({
      message: "User Already Exists!",
      status: 403
    })
  }
})

// Lesson 8 for auth. route for login -> /login 
router.post('/login', async (req, res, next) => {
  //console.log(req.body);
  Groupie.findOne({email: req.body.email}, function(err, groupie){
    if(err){
      console.log(err)
      res.json({
        message: "Error Accessing Database",
        status: 500
      })
    }
    console.log(groupie);
    if(groupie){
      let passwordMatch = passwordService.comparePasswords(req.body.password, groupie.password);
      if(passwordMatch){
        console.log('User logged in!')
        let token = tokenService.assignToken(groupie);
        res.json({
          message: "Login was successful!",
          status: 200,
          token
        })
      }
      else{
        console.log("Wrong Passowrd");
        res.json({
          message: "Wrong password",
          status: 403
        })
      }
    }
    else{
      res.json({
        message: "Wrong email",
        status: 403
      })
    }
  })
})

//route to get user profile iformation -> /profile
router.get('/profile', async (req, res, next) => {
  console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);

  if(myToken){
    let currentGroupie = await tokenService.verifyToken(myToken);
    console.log(currentGroupie);
    if(currentGroupie){
      let responseGroupie = {
        firstName: currentGroupie.firstName,
        lastName: currentGroupie.lastName,
        email: currentGroupie.email,
        deleted: currentGroupie.deleted,
        admin: currentGroupie.admin
      }
      res.json({
        message: "Groupie information loaded successfully!",
        status: 200,
        responseGroupie
      })
    }
    else{
      res.json({
        message: "Token is invalid or expired",
        status: 403
      })
    }
  }
  else{
    res.json({
      message: "No token received",
      status: 403
    })
  }
})

module.exports = router;
