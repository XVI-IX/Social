const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile, followProfile
} = require("../controllers/user");

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.get("/profile/:user_id", followProfile);

module.exports = router;