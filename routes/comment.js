const express = require("express");
const router = express.Router();
const {
  postComment,
  replyComment,
  deleteComment,
  getReplies, likeComment
} = require("../controllers/comments");

router.post("/comment/:postId", postComment);
router.post("/comment/reply/:commentId", replyComment);
router.get("/comment/:commentId", getReplies)
router.get("/comment/:commentId/like", likeComment);
router.delete("/comment/:commentId", deleteComment);

module.exports = router;