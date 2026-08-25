export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request", errors?: unknown) {
    return new AppError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized access") {
    return new AppError(401, message);
  }

  static forbidden(message = "Forbidden resource") {
    return new AppError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new AppError(404, message);
  }

  static conflict(message = "Resource already exists") {
    return new AppError(409, message);
  }

  static internal(message = "Internal server error") {
    return new AppError(500, message);
  }
}
