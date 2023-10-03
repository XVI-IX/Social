class BaseError extends Error {

  constructor(name, httpCode, isOperational, message) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    // Ensuring the prototype inherits from the constructor when using new keyword.
    Object.setPrototypeOf(this, new.target.prototype);

    // Creates a stack object for the object.
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;