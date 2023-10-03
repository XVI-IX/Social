require('dotenv').config();

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../error");
const {
  signup, login,
  forgotPassword, resetPassword
} = require("../controllers/auth");


// router.post("/signup", passport.authenticate("signup", { session: false }), (req, res) => {
//   res.json({
//     message: "Signup successful",
//     success: true,
//     username: req.user.username,
//     status: 201
//   });
// })
router.post("/signup", signup);
router.post("/login", login);

// router.post("/login", async (req, res, next) => {
//   passport.authenticate(
//     'login',
//     async (err, user, info) => {
//       try {
//         if (!user) {
//           const error = new NotFoundError("User not found");
//           return done(error);
//         }

//         if (err) {
//           const error = new Error("An Error Occured. Try again");
//           return next(error);
//         }

//         req.login(
//           user, {session: false},
//           async (error) => {
//             if (error) {
//               return next(error);
//             }

//             const payload = {
//               userId: user._id,
//               email: user.email,
//             }
//             const token = jwt.sign({user: payload}, process.env.SECRET);
//             req.session.userId = user._id;

//             return res.json({
//               message: "Login successful",
//               status: 200,
//               success: true
//             });
//           }
//         )
//       } catch (error) {
//         return next(error);
//       }
//     }
//   )(req, res, next);
// })

router.post("/forgotPassword", forgotPassword);

router.get("/resetPassword", async (req, res) => {
  res.send("Use postman to change password");
  
});

router.post("/resetPassword", resetPassword);

module.exports = router;
