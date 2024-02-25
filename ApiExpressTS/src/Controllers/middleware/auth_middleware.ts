import { NextFunction, Response, Request} from 'express';
import * as jwt from 'jsonwebtoken';
import {AuthTokenMissingError} from '../../Entity/errors';
import {WrongAuthTokenError} from '../../Entity/errors';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.KEY!;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret);
      const email = verificationResponse;
      //const user = await getUserByEmail(email);///
    } catch (error) {
      next(new WrongAuthTokenError());
    }
  } else {
    next(new AuthTokenMissingError());
  }
  next();
}

export default authMiddleware;