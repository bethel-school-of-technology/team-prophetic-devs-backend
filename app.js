var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
const { Server } = require("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var socketRouter = require("./routes/socket");

// APP IS RUNNING AT PORT 5000
var app = express();
app.use(cors({
  origin: "http://localhost:4200"
}));

//Socket things...
//Listening to port 4200 which is our frontend location
//var server = app.listen(3000);


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
