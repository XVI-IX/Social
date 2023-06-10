require("dotenv").config();

const express = require('express');
const app = express();
const session = require("cookie-session");

const connectDB = require("./db/connect");

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(3000, () => {
    console.log("App is listening on port 3000...");
  })
}

start();
