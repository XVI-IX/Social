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
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user_id
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         user_id:
 *           type: string
 *           description: ID of user making post
 *         content:
 *           type: string
 *           description: Post content
 *         img_url:
 *           type: string
 *           description: URL to image attached to post
 *         likes:
 *           type: number
 *           description: Number of likes on post
 *         liked_by:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs that have liked the post
 *       example:
 *         user_id: nabardd
 *         content: David-Daniel
 *         img_url: Ojebiyi
 *         likes: 10
 *         liked_by: [oladoja14@gmail.com]
 */

/**
 * @swagger
 * tags:
 *   name: Social
 *   description: The Social API
 * /post:
 *   post:
 *     summary: Make a post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of user adding the post
 *                 content:
 *                   type: string
 *                   description: Post content
 *                 img_url:
 *                   type: string
 *                 likes:
 *                   type: integer
 *                   format: int32
 *                 likedBy:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *   get:
 *     summary: Get all posts made by user in session
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The retrieved posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /post/{postId}:
 *   get:
 *     summary: Get a particular post
 *     tags: [Post]
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please try again
 *   /post/{postId}/share:
 *     get:
 *       summary: Get a link to share post
 *       tags: [Post]
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: ID of post to be shared
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Object with share link
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Share link
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   link:
 *                     type: string
 *                     example: https://social-cgx9.onrender.com/posts/{postId}
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Share link could not be accessed, try again
 *         404:
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Post not found
 *                   success:
 *                     type: boolean
 *                     example: false
 *   /post/{postId}/like:
 *     get:
 *       summary: Like a post and get response
 *       tags: [Post]
 *       responses:
 *        200:
 *           description: Response from liking a post
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Liked Successfully
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   likes:
 *                     type: integer
 *                     example: 201
 */


router.post("/post", upload.single("image"), addPost);
router.get("/post", getPosts);
router.get("/post/:postId", getPost)
router.get("/post/:postId/share", sharePost);
router.get("/post/:postId/like", likePost);
router.patch("/post/:postId", editPost);
router.delete("/post/:postId", deletePost);


module.exports = router;