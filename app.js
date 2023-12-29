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
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to Social");
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Social API",
      version: "0.1.0",
      description: " This project involves building a social media platform that allows users to connect, share content, and interact with posts. The platform provides features such as user profiles, news feeds, and comment sections.",
      license: {
        name: "",
        url: ""
      },
      contact: {
        name: "XVI-IX",
        email: "oladoja14@gmail.com"
      },
    },
    servers: [
      {
        url: "http://localhost:3000"
      },
      {
        url: "https://social-cgx9.onrender.com/"
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, {
  explorer: true
}))


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
