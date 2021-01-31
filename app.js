var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var socket = require("socket.io");
const { Server } = require("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var socketRouter = require("./routes/socket");

//Server listening to our frontend.
let server = Server(app);

// APP IS RUNNING AT PORT 5000
var app = express();
app.use(cors());

//Makes socket run on this server.
var io = socket(server);

//MONGO CONNECTION
var connectionString = " mongodb://127.0.0.1/express-api";
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function () {
    console.log("Database is connected :) Hows your day going?");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/socket", socketRouter);

module.exports = app;
