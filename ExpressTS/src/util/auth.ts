import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { compare }  from 'bcrypt';
import env from "dotenv";
import {  Request, Response,NextFunction } from 'express';
env.config();


const KEY: string = process.env.KEY!;

export function createJSONToken(email: string) {
  return sign({ email }, KEY, { expiresIn: '1h' });
}

export function validateJSONToken(token: string) {
  return verify(token, KEY);
}

export function isValidPassword(password: string, storedPassword: string) {
  return compare(password, storedPassword);
}

import { NotAuthorizedError } from './errors';

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

