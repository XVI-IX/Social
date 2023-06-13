require("dotenv").config();

const express = require('express');
const app = express();
const session = require("cookie-session");
const passport = require('passport');

const connectDB = require("./db/connect");

app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 10 * 60 * 100000,
  },
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to the Social");
})

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(3000, () => {
    console.log("App is listening on port 3000...");
  })
}

start();
