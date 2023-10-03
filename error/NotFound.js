const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class NotFoundError extends BaseError {
  constructor(message = 'NOT FOUND') {
    super(message, StatusCodes.NOT_FOUND, true, message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = {NotFoundError};