module.exports = function (io) {
  router.post("/chat", (req, res, next) => {
    io.on("message", function (socket) {
      socket.on('message', data);
      console.log(data)
    });
  });
};
// router.get("/chat", async (req, res, next) => {
//   console.log(req.headers);
//   let myToken = req.headers.authorization;
//   console.log(myToken);
//   if (myToken) {
//     let currentGroupie = await tokenService.verifyToken(myToken);
//     console.log(currentGroupie);
//     if (currentGroupie) {
//       io.on("connection", function (socket) {
//         console.log("made socket connection");
//         socket.on('chat message', (msg) => {
//             console.log('message: ' + msg);
//             io.emit('chat message', msg);
//         });
//         socket.on("disconnect", () => {
//           console.log("User disconnected");
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
