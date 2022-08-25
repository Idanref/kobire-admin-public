const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
  reviewScore: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
