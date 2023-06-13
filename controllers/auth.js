const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models");

passport.use(
  'signup', new LocalStrategy({
    username: "email",
    password: "password",
    passReqToCallback: true
  }, async (req, done) => {
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
    username: "email",
    password: "password",
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
      })
    }
  })
)