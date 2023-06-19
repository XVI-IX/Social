const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError } = require("../error");
const { User } = require("../models");

const getInfo = async (req, res) => {
  const userId = req.session.userId;

  if (!userId){
    throw new UnAuthenticatedError("Please log into your account!!");
  }

  try {
    const user = await User.findById(userId).select("-password");

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

module.exports = {
  getInfo,
}