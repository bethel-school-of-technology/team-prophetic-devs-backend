router.post('/', function(req, res, next) {
    req.io.emit('some_event');
    //do some stuff
    req.io.emit("some_other_event"); //we did some stuff - emit a related event
});