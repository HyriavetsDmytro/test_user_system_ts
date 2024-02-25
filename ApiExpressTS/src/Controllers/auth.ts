import {  Request, Response,NextFunction } from 'express';
import { NotAuthorizedError } from '../Entity/errors';
import { validateJSONToken } from '../Services/auth_validation';
export function checkAuthMiddleware(req :Request, res: Response, next: NextFunction)
{
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
     return next(new NotAuthorizedError());
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthorizedError());
  }
  const authToken = authFragments[1];
   try {
    // const checkToken = req.token;
    // if (checkToken !== undefined) {
    //    return next(new NotAuthorizedError());
    // }
    const validatedToken = validateJSONToken(authToken);
    
   // req.token! = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
     next(new NotAuthorizedError());
  }
    next();
}

