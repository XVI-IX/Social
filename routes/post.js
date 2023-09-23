const express = require("express");
const router = express.Router();
const {
  addPost, getPosts,
  editPost, deletePost,
  sharePost, getPost,
  likePost
} = require("../controllers/post");
const upload = require("../utils/upload");

router.post("/posts", upload.single("image"), addPost);

router.get("/posts", getPosts);
router.get("/posts/:postId", getPost)
router.get("/posts/:postId/share", sharePost);

router.get("/posts/:postId/like", likePost);

router.patch("/posts/:postId", editPost);
router.delete("/posts/:postId", deletePost);


module.exports = router;