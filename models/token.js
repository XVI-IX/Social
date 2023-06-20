const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  token: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  }
})

module.exports = mongoose.model("Token", TokenSchema);