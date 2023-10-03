const { StatusCodes } = require("http-status-codes");
// const { CustomError } = require("BaseError");
const BaseError = require("./baseError");

class BadRequestError extends BaseError {
  constructor(message = "Bad Request") {
    super('BAD REQUEST', StatusCodes.BAD_REQUEST, true, message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = {BadRequestError};