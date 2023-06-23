const mongoose = require("mongoose")

require("dotenv").config();

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: String,
    desc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts'
    }
  },
  user_id: {
    type: String,
    desc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  comment_id: {
    type: String,
    desc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments"
    }
  },
  content: {
    type: String,
    required: true,
    max_length: 256,
  },
  likes: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  modified_at: {
    type: Date,
    default: new Date()
  }
})


module.exports = mongoose.model("comments", CommentSchema);