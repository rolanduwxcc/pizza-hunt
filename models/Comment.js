const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Create Comment model via Schema
const Comment = model('Comment', CommentSchema);

//Export the model
module.exports = Comment;