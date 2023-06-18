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
  created_at: {
    type: Date,
    default: new Date()
  },
  modified_at: {
  type: Date,
  default: new Date(),
  }
})


module.exports = mongoose.model("posts", PostSchema);