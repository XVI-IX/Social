const {BadRequestError} = require("./BadRequest");
const {NotFoundError} = require("./NotFound");
const {UnAuthenticatedError} = require("./Unauthenticated");
const {ForbiddenError} = require("./Forbidden");
const {InternalServerError} = require("./InternalServerError");


module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  ForbiddenError,
  InternalServerError
}