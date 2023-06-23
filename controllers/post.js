require("dotenv").config();

const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError, BadRequestError, ForbiddenError } = require("../error");
const { User, Post } = require("../models");

const addPost = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log into your account");
  }

  const postBody = req.body;

  try {
    const newPost = await Post.create(postBody)

    return res.status( StatusCodes.OK ).json({
      message: "Post Successful",
      success: true,
      post: newPost
    })
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const getPosts = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in")
  }

  try {
    const post = await Post.find({
      user_id: userId
    });

    if (!post) {
      return res.status( StatusCodes.NOT_FOUND ).json({
        message: `Post not found`,
        success: false
      })
    }

    return res.status( StatusCodes.OK ).json({
      message: "Post found",
      success: true,
      post: post
    })
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const getPost = async (req, res) => {
  const postId = req.params.postId;
  // const userId = req.session.userId;

  // if (!userId) {
  //   throw new UnAuthenticatedError("Please Log in")
  // }

  try {
    const post = await Post.find({
      _id: postId
    })

    if (!post) {
      return res.status( StatusCodes.NOT_FOUND ).json({
        message: "Post not found",
        success: false
      })
    }

    return res.status( StatusCodes.OK ).json({
      message: "Post found",
      success: true,
      post: post
    })
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const editPost = async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.postId;

  const {
    content
  } = req.body;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in")
  }

  try {
    const post = await Post.findOneAndUpdate({
      user_id: userId,
      _id: postId
    }, {
      content: content,
      modified_at: new Date()
    });

    return res.status( StatusCodes.OK ).json({
      message: "Update Successful",
      success: true,
      post: post
    })
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in");
  }

  try {
    await Post.findByIdAndDelete(postId);

    return res.status( StatusCodes.OK ).json({
      message: "Post deleted",
      success: true
    })
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const sharePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status( StatusCodes.NOT_FOUND ).json({
        message: "Post not found",
        success: false
      })
    }

    return res.status( StatusCodes.OK ).json({
      message: "Share link",
      success: true,
      link: `${process.env.URL}/posts/${postId}`
    })
  } catch (error) {
    
  }
}

const likePost = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in!")
  }

  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status( StatusCodes.NOT_FOUND ).json({
        message: "Post not found",
        success: false
      })
    }

    if (post.likedBy.includes(userId)) {
      return res.status( StatusCodes.OK ).json({
        message: "You have liked this post already",
        success: true
      })
    }

    try {
      await Post.findOneAndUpdate({
        _id: req.params.postId
      }, {
        $inc: {likes: 1},
        $addToSet: {likedBy: userId}
      });

      post.likedBy.push(userId);

      const likes = await Post.findById(req.params.postId)
                              .select('likes likedBy');

      return res.status( StatusCodes.OK ).json({
        message: " Liked successfully",
        success: true,
        likes: likes
      })
    } catch (error) {
      throw new BadRequestError("Like could not be updated, try again later");
    }
  } catch (error) {
    throw new BadRequestError("Please try again");
  }
}

module.exports = {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  sharePost,
  likePost,
}
