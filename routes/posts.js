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

router.get("/getPost", async (req, res, next) => {
  find((err, res) => {
    if (res) {
      res.json(res);
    }
    if (err) {
      console.log(err);
    } else {
      console.log("Don't know whats happening.");
    }
  });
});

module.exports = router;
