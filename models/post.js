const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require('dotenv').config();

const PostSchema = new mongoose.Schema({
  user_id: {
    type: String,
    desc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  content: {
    type: String
  },
  img_url: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String]
  }
}, {
  timestamps: true
});


module.exports = mongoose.model("posts", PostSchema);