const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("./error");

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NotFound;
  }
}

module.exports = {NotFoundError};