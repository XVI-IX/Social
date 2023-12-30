const { StatusCodes } = require('http-status-codes');
const {
  UnAuthenticatedError
} = require('../error');


const authMiddleware = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status( StatusCodes.UNAUTHORIZED ).json({
      message: "Please log into Social",
      success: false
    })
    throw new UnAuthenticatedError("Please log into Social");
  }

  next();
}

module.exports = authMiddleware
