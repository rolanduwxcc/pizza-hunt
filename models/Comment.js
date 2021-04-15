const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'Please enter a reply!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'Who are you who are you',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: 'Who are you who are you',
            trim: true
        },
        commentBody: {
            type: String,
            required: 'Please enter a comment!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//get total count of replies and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});



//Create Comment model via Schema
const Comment = model('Comment', CommentSchema);

//Export the model
module.exports = Comment;