import { NextFunction, Request, Response } from 'express';
import {BaseHttpError} from '../../Entity/errors';

export default function errorMiddleware(error: BaseHttpError, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      message,
      status,
    });
}