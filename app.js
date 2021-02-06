<<<<<<< HEAD
var express = require('express');
var http = require('http').Server(express)
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require("cors")
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
>>>>>>> 8b6a88bd167fc07d3466f9ab3e3aaff99d58e7ea

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var socketRouter = require("./routes/socket");

// APP IS RUNNING AT PORT 5000
var port = 5000;
var app = express();
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "PUT"],
  transports: ['polling', 'websocket'],
}));

// //Socket things...
// const server = require('http').createServer();
// const io = require('socket.io')(server, {
//   origin: 'http://localhost:4200'
// });


// io.on('connection', socket => { /* ... */ });

// server.listen(3000);
//Listening to port 4200 which is our frontend location
//var server = app.listen(3000);


//MONGO CONNECTION
var connectionString="mongodb+srv://dbuser:Password1!@cluster0.xztln.mongodb.net/OpenMic?retryWrites=true&w=majority"
// var connectionString = " mongodb://127.0.0.1/express-api";
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(){
    console.log('Database is connected :) Hows your day going?')
})

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/socket", socketRouter);

http.listen(port, console.log('server is running now on port: ', port)).on('error', function(err) {
    console.log('server start error', err);
})

module.exports = app;
