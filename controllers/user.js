const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError, BadRequestError } = require("../error");
const { User } = require("../models");

const getProfile = async (req, res) => {
  const userId = req.session.user._id;

  try {
    const user = await User.findById(userId).select("-password -resetPasswordToken -resetToken");

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
    })

    return res.status( StatusCodes.OK ).json({
      message: "Profile Updated",
      success: true
    })
  } catch (error) {
    throw new BadRequestError("Please try again later.")
  }
}

const followProfile = async (req, res) => {
  const user_id = req.session.user._id;
  const profile_id = req.params.user_id;

  if (profile_id) {
    try {
      const profile = await User.findById(profile_id);

      if (!profile) {
        return res.status( StatusCodes.NOT_FOUND ).json({
          message: 'Profile not found.',
          success: false,
          status: StatusCodes.NOT_FOUND
        })
      }

      if (profile.followers.includes(user_id)) {
        try {
          await User.findOneAndUpdate({
            _id: profile_id
          }, {
            $inc: {follower_count: -1},
            $pull: {followers: user_id}
          })

          res.status( StatusCodes.OK ).json({
            message: `Unfollowed ${profile.username}`,
            status: StatusCodes.OK,
            success: true
          });

        } catch (error) {
          console.error(error);
          throw new Error("Please try again later");
        }
      }

      try {
        await User.findOneAndUpdate({
          _id: profile_id
        }, {
          $inc: {follower_count: 1},
          $addToSet: {followers: user_id}
        })

        return res.status( StatusCodes.OK ).json({
          message: `Following ${profile.username}`,
          success: true,
          status: StatusCodes.OK
        })
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  getProfile,
  updateProfile,
  followProfile
}
