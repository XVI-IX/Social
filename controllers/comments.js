require('dotenv').config();
const { Comment } = require('../models');
const { StatusCodes } = require("http-status-codes");
const { 
  BadRequestError,
  UnAuthenticatedError,
  ForbiddenError
 } = require("../error");

const postComment = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log into your account");
  }

  const commentBody = req.body;
  commentBody['user_id'] = userId;

  try {
    const newComment = await Comment.create(commentBody)

    return res.status( StatusCodes.OK ).json({
      message: 'Comment successful',
      success: true,
      comment: newComment
    })
  } catch (error) {
    throw new BadRequestError("Comment not posted, try again");
  }

}

const replyComment = async (req, res) => {
  const commentId = req.params.commentId
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in");
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status( StatusCode.OK ).json({
        message: "Comment could not be found",
        success: false
      })
    }

    req.body['commentId'] = commentId;

    const newComment = await Comment.create(req.body)

    return res.status( StatusCodes.OK ).json({
      message: "Comment successful",
      success: true,
      comment: newComment
    })
  } catch (error) {
    throw new BadRequestError("Please try again");
  }
}

const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.session.userId;

  if (!user) {
    throw new UnAuthenticatedError("Please log in")
  }

  try {
    const comment = await Comment.findOne({
      _id: commentId,
    })

    if (comment.user_id !== userId) {
      throw new ForbiddenError("No permission to delete")
    }

    await Comment.findOneAndDelete({
      _id: commentId,
      user_id: userId
    });

    return res.status( StatusCodes.DEL)
  } catch (error) {
    
  }
}

const getReplies = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comments = await Comment.find({
      comment_id: commentId
    });

    if (!comments) {
      res.status( StatusCodes.NOT_FOUND ).json({
        message: "No replies",
        success: false
      })
    }

    return res.status( StatusCodes.OK ).json({
      message: "Replies found",
      success: true,
      comments: comments
    })
  } catch (error) {
    throw new BadRequestError("Please, try again");
  }
}

const likeComment = async (req, res) => {
  const userId = req.session.userId;
  const commentId = req.params.commentId;

  if (!userId) {
    throw new UnAuthenticatedError("Please log in");
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status( StatusCodes.NOT_FOUND ).json({
        message: "Comment not found",
        success: false
      })
    }

    if (comment.likedBy.includes(userId)) {
      return res.status( StatusCodes.OK ).json({
        message: "You have liked this comment already",
        success: true
      })
    }

    await Comment.findOneAndUpdate(
      {_id: commentId},
      {
        $inc: {likes: 1},
        $addToSet: {likedBy: userId}
      }
      )


    const likes = await Comment.findById(commentId)
                                .select("likes likedBy");

    return res.status( StatusCodes.OK ).json({
      message: "Like successful",
      success: true,
      likes: likes,
    })
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}
module.exports = {
  postComment,
  replyComment,
  deleteComment,
  getReplies,
  likeComment
}