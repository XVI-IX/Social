const jwt = require("jsonwebtoken");
const { User } = require("./models");


const signup = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create({ data });
    req.session.userId = user._id;

  res.status( StatusCodes.CREATED ).json({
    success: true,
    msg: "User created successfully"
  })
  } catch (error) {
    throw new Error(error.message);
  }
}

const login = () => {

}

module.exports = {
  signup,
  login
}