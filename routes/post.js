const express = require("express");
const router = express.Router();
const {
  addPost, getPost,
  editPost, deletePost
} = require("../controllers/post");

router.post("/posts", addPost);
router.get("/posts", getPost);
router.patch("/posts/:postId", editPost);
router.delete("/posts/:postId", deletePost);

module.exports = router;