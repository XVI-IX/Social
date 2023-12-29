const express = require("express");
const router = express.Router();
const {
  addPost, getPosts,
  editPost, deletePost,
  sharePost, getPost,
  likePost
} = require("../controllers/post");
const upload = require("../utils/upload");

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - user_id
 *        - content
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the post
 *        user_id:
 *          type: string
 *          description: ID of user making post.
 *        content:
 *          type: string
 *          description: Post content
 *        img_url:
 *          type: string
 *          description: URL to image attached to post
 *        likes:
 *          type: number
 *          description: number of likes on post
 *        liked_by:
 *          type: [string]
 *          description: array of user IDs that have liked the post.
 *      example:
 *          user_id: nabardd,
 *          content: David-Daniel,
 *          img_url: Ojebiyi,
 *          likes: 10,
 *          liked_by: [oladoja14@gmail.com]
 */


router.post("/post", upload.single("image"), addPost);
router.get("/post", getPosts);
router.get("/post/:postId", getPost)
router.get("/post/:postId/share", sharePost);
router.get("/post/:postId/like", likePost);
router.patch("/post/:postId", editPost);
router.delete("/post/:postId", deletePost);


module.exports = router;