const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile
} = require("../controllers/user");

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

module.exports = router;