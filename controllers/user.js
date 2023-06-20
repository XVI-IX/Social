const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError, BadRequestError } = require("../error");
const { User } = require("../models");

const getProfile = async (req, res) => {
  const userId = req.session.userId;

  if (!userId){
    throw new UnAuthenticatedError("Please log into your account!!");
  }

  try {
    const user = await User.findById(userId).select("-password -resetPasswordToken");

    if (user) {
      return res.status( StatusCodes.OK ).json({
        message: "User info query successful",
        success: true,
        data: user
      })
    }

    return res.status( StatusCodes.NOT_FOUND ).json({
      message: `User with id: ${userId} not found`,
      success: false
    })
  } catch (error) {
    throw new BadRequestError("Please try again");
  }
}

const updateProfile = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnAuthenticatedError("Please, Log into your account")
  }

  const {
    userName,
    phoneNumber
  } = req.body;

  try {
    await User.findOneAndUpdate({
      _id: userId
    }, {
      username: userName,
      phone_number: phoneNumber,
      modified_at: new Date()
    })

    return res.status( StatusCodes.OK ).json({
      message: "Profile Updated",
      success: true
    })
  } catch (error) {
    throw new BadRequestError("Please try again later.")
  }
}

module.exports = {
  getProfile,
  updateProfile
}