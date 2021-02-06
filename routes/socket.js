var express = require('express');
var router = express.Router();

router.get('/getUserName', async (req, res, next) => {
  console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);
  if(myToken){
    let currentGroupie = await tokenService.verifyToken(myToken);
    console.log(currentGroupie);
    if(currentGroupie){
      let responseGroupie = {
        username: currentGroupie.username,
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

// router.get("/allChat", async (req, res, next) => {
//   console.log(req.headers);
//   let myToken = req.headers.authorization;
//   console.log(myToken);
//   if (myToken) {
//     let currentGroupie = await tokenService.verifyToken(myToken);
//     console.log(currentGroupie);
//     if (currentGroupie) {
//       io.on("connection", (socket) => {
//         console.log(`A user (${currentGroupie.username}) has finally connected!`);
//         socket.emit(
//           "test event",
//           "This is the backend talking...You are connected!"
//         );
//         socket.on("msg", (data) => {
//           console.log(data);
//         });
//       });
//       io.on("connection", (socket) => {
//         socket.on("msg", (data) => {
//           io.emit("msg", data);
//         });
//       });
//     } else {
//       res.json({
//         message: "Token is invalid or expired",
//         status: 403,
//       });
//     }
//   } else {
//     res.json({
//       message: "No token received",
//       status: 403,
//     });
//   }
// });