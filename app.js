var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var socketRouter = require("./routes/socket");
var postsRouter = require("./routes/posts");
var eventsRouter = require("./routes/events");

// APP IS RUNNING AT PORT 5000
var app = express();
app.use(cors({
  origin: "https://boring-nightingale-93b5c6.netlify.app",
  methods: ["GET", "PUT", "POST"],
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
app.use("/api/posts", postsRouter);
app.use("/api/events", eventsRouter);

module.exports = app;
