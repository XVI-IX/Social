require('dotenv').config();

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../error");

// router.post("/signup", passport.authenticate(
//   'signup', {session: false},
//   (req, res, next) => {
//     res.json({
//       message: "signup successful",
//       user: req.user
//     })

//     next();
//   }
// )(req, res, next));

// router.post("/signup", (req, res) => {
//   passport.authenticate(
//     'signup', {session: false}),
//     (req, res) => {
//       res.json({
//         message: "Signup Successful",
//         user: req.user
//       });
//     }
//   )
// })

router.post("/signup", passport.authenticate("signup", { session: false }), (req, res) => {
  res.json({
    message: "Sigup successful",
    user: req.user
  });
})

router.post("/login", async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (!user) {
          const error = new NotFoundError("User not found");
          return done(error);
        }

        if (err) {
          const error = new Error("An Error Occured. Try again");
          return next(error);
        }

        req.login(
          user, {session: false},
          async (error) => {
            if (error) {
              return next(error);
            }

            const payload = {
              userId: user._id,
              email: user.email,
            }
            const token = jwt.sign({user: payload}, process.env.SECRET);

            return res.json({
              token
            });
          }
        )
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
})

module.exports = router;