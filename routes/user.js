const express = require("express");
const router = express.Router();

const { getInfo } = require("../controllers/user");

router.get("/profile", getInfo);

module.exports = router;