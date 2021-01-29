var express = require('express');
var path = require('path');
var http = require('http')
var routes = require('./routes/index');
var io = require('socket.io');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// APP IS RUNNING AT PORT 5000
var app = express();

//Fixes stupid cors >:( 
app.use(cors());

//Create HTTP server
var server = http.createServer(app)

//MONGO CONNECTION
var connectionString = " mongodb://127.0.0.1/express-api";
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(){
    console.log('Database is connected :) Hows your day going?')
});


//Setup for Socket.io
io = io(server);
app.use(function(req, res, next) {
    req.io = io;
    next();
});
io.on('connection', function(socket){
    console.log('socket.io connection made');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

//Socket.io stuff
app.use('/', routes);
server.listen('3000');

module.exports = app;
