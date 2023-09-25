const express = require("express");
const router = express.Router();
const {
  addPost, getPosts,
  editPost, deletePost,
  sharePost, getPost,
  likePost
} = require("../controllers/post");
const upload = require("../utils/upload");

router.post("/post", upload.single("image"), addPost);
router.get("/post", getPosts);
router.get("/post/:postId", getPost)
router.get("/post/:postId/share", sharePost);
router.get("/post/:postId/like", likePost);
router.patch("/post/:postId", editPost);
router.delete("/post/:postId", deletePost);


module.exports = router;