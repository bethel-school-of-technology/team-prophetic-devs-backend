//firstName, lastName, email,cityState, instruments, username, password, deleted, role
var mongoose = require('mongoose');

var groupieSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    cityState: {
        type: String,
        required: false
    },
    instruments: {
        type: String,
        required: false
    },
    genres:{
        type: String,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})


var Groupie = mongoose.model('user', groupieSchema);

module.exports = Groupie