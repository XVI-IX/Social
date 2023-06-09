require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.schema({
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
    validate: {
      validator: function(value) {
        return check(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
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

module.exports = mongoose.model('users', UserSchema);