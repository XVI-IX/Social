require("dotenv").config();

const express = require('express');
const app = express();
const session = require("cookie-session");
const connectDB = require("./db/connect");

const passport = require('passport');
require("./controllers/auth");

// Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

// Middleware
const authMiddleware = require("./middleware/auth");

const {
  uploadImage,
  getImageInfo
} = require("./utils/cloudinary");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: process.env.SPAN,
  },
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to Social");
});

app.use(authRouter);
app.use(authMiddleware, userRouter);
app.use(authMiddleware, postRouter);
app.use(commentRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(3000, () => {
    console.log("App is listening on port 3000...");
  })
}

start();
