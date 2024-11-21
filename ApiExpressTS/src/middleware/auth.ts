import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../entity/errors'
import { validateJSONToken } from '../utils/auth_validation'
export function checkAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    return next(new NotAuthorizedError())
  }
  const authFragments = req.headers.authorization.split(' ')

  if (authFragments.length !== 2) {
    return next(new NotAuthorizedError())
  }
  const authToken = authFragments[1]
  try {
    const validatedToken = validateJSONToken(authToken)
  } catch (error) {
    next(new NotAuthorizedError())
  }
  next()
}
