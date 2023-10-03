const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED, true, message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = {UnauthorizedError};