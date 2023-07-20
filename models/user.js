require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check } = require("../utils/verifyNumber");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your username"],
    unique: true
  },
  first_name: {
    type: String,
    required: [true, "Please provide your first name"]
  },
  last_name: {
    type: String,
    required: [true, "Please provide your last name"]
  },
  other_name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  },
  profile_image_url: {
    type: String,
  },
  phone_number: {
    type: String,
    required: [true, "Please provide a valid phone number"],
    unique: true,
    match: [
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Please provide valid phone number ({country code}{number} or +{country code}{number})"
    ],
    // validate: {
    //   validator: function(value) {
    //     return check(value);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // }
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  modified_at: {
    type: Date,
    default: new Date()
  },
  resetToken: {
    type: String,
    default: crypto.randomBytes(32).toString("hex"),
    expires: 3600
  }
}, {
  timestamp: true,
});

UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function() {
  return jwt.sign({
    userId: this._id,
    first_name: this.first_name,
  }),
  process.env.SECRET,
  {
    expiresIn: process.env.SPAN
  }
}

UserSchema.methods.comparePassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match
  } catch (error) {
    throw new Error("Please provide valid password");
  }
}

UserSchema.methods.getResetToken = async function () {

  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(this.resetToken)
  .digest("hex")

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken
}


module.exports = mongoose.model('users', UserSchema);
