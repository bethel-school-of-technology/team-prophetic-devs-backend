var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  req.io.emit('some_event');
  //do some stuff
  req.io.emit("some_other_event"); //we did some stuff - emit a related event
});

module.exports = router;
