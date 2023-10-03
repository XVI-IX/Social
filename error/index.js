const {BadRequestError} = require("./BadRequest");
const {NotFoundError} = require("./NotFound");
const {UnAuthenticatedError} = require("./Unauthenticated");
const {UnauthorizedError} = require("./unauthorized");


module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnauthorizedError,
}