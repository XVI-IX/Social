const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("./customError");

class UnAuthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHENTICATED;
  }
}


module.exports = {
  UnAuthenticatedError,
}