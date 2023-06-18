require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require("../models");

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
