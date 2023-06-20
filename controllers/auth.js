require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError
} = require("../error");

const crypto = require("crypto");

const { User, Token } = require("../models");
const { send } = require("../utils")

passport.use(
  'signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.create({
        ...req.body
      });

      return done(null, user, {
        message: "User Created Successfully"
      })
    } catch (error) {
      return done(error, {
        message: "User could not be created, try again."
      })
    }
  })
);

passport.use(
  "login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({email});

      if (!user) {
        return done(null, false, {
          message: "User not found"
        })
      }

      const valid = user.comparePassword(password);

      if (!valid) {
        return done(null, false, {
          message: "Wrong Password"
        });
      }

      return done(null, user, {
        message: "User Created successfully"
      })
    } catch (error) {
      return done(error, {
        message: "Could not login, try again."
      });
    }
  })
);

passport.use(
  new JWTStrategy (
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({
      email: email
    });

    if (!user) {
      return res.status( StatusCode.NOT_FOUND ).json({
        message: "User not found",
        success: false
      })
    }

    let token = await Token.findOne({
      user_id: user._id
    });

    if (token) {
      await token.deleteOne()
    }

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10)

    // Save new token to DB
    token = await Token.create({
      user_id: user._id,
      token: hash,
      created_at: Date.now()
    })

    const link = `localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
    const data = {
      "from": process.env.EMAIL_USER,
      "to": user.email,
      "subject": "Password Reset",
      "html": `\
      <h5>Dear ${user.username},</h5>\

      <p>
      Please find the password reset link <a href="http://${link}">here</a>.
      <br>
      If link provided above does not function, use this
      <p>http://${link}</p>
      </p>

      <p>
      <h5>Stay Safe</h5>
      <h5>Social</h5>
      </p>
      
      `
    }

    try {
      const result = await send(data);
      return res.status( StatusCodes.OK ).json({
        message: "",
        success: true,
        result: result
      })
    } catch (error) {
      console.log(error)
    }

  } catch (error) {
    console.log(error);
    throw new BadRequestError("Please try again");
  }
}

// const resetPassword = 
module.exports = {
  forgotPassword
}
