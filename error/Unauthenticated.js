const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class UnAuthenticatedError extends BaseError {
  constructor(message = "Unauthenticated Error") {
    super(message, StatusCodes.UNAUTHENTICATED, false, message);
    this.statusCode = StatusCodes.UNAUTHENTICATED;
    }
}

module.exports = {UnAuthenticatedError}