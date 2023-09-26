class BaseError extends Error {

  constructor(name, httpCode, isOperational, message) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;