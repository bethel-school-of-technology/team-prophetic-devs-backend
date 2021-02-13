//createdBy, title, postBody, date
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

var Post = mongoose.model('post', postSchema);

module.exports = Post