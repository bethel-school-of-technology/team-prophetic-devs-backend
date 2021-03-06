var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var tokenService = require("../services/bodygaurd");

router.post("/createPost", async (req, res, next) => {
  console.log(req.headers);
  let myToken = req.headers.authorization;
  if (myToken) {
    let currentGroupie = await tokenService.verifyToken(myToken);
    console.log(currentGroupie);
    if (currentGroupie) {
      try {
        console.log(req.body);
        let newPost = new Post({
          name: currentGroupie.firstName + " " + currentGroupie.lastName,
          createdBy: currentGroupie.email,
          title: req.body.title,
          postBody: req.body.postBody,
        });
        let result = await newPost.save();
        console.log(result);
        res.json({
          message: "Post Successfully Created",
          status: 200,
        });
      } catch (err) {
        console.log(err);
        res.json({
          message: "Post Not Created",
          status: 403,
        });
      }
    }
  }
});

router.get("/getPosts", async (req, res, next) => {
  let myToken = req.headers.authorization;
  if(myToken){
    let currentGroupie = await tokenService.verifyToken(myToken);
    console.log(currentGroupie);
    if(currentGroupie){
      Post.find({}).sort({createdDate:"desc"}).exec(function(err, result){
        if (err){
              console.log(err);
            } else {
              res.json(result);
            }
      })
    // Post.find({}, (err, result) => {
    //   console.log("Post Find all response:***" +res+"***");
    //   if (err){
    //     console.log(err);
    //   } else {
    //     res.json(result);
    //   }
    // });

    }
  }
});

module.exports = router;
