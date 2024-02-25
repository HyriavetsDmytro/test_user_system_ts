export class BaseHttpError extends Error {
  public message: string;
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}


export class AuthTokenMissingError extends BaseHttpError {
  constructor() {
    super(401, 'Authentication token is missing.');
  }
}
export class NotAuthorizedError extends BaseHttpError {
  constructor() {
    super(403, "You're not authorized");
  }
}

export class WrongInfoError extends BaseHttpError {
  constructor() {
    super(401, "Wrong information provided");
  }
}
export class WrongAuthTokenError extends BaseHttpError {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}
export class ExistUserError extends BaseHttpError {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export class UserNotFoundError extends BaseHttpError {
  constructor(email: string) {
    super(404, `User with email ${email} not found`);
  }
}



