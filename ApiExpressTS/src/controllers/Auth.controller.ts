import { Request, Response, NextFunction } from 'express'
import { WrongInfoError } from '../entity/errors'
import { loggingUser, registerUser } from '../services/Auth.service'

export const registration = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, pin, password } = req.body
    if (email === undefined || pin === undefined || password === undefined) {
      throw new WrongInfoError()
    }
    const result = await registerUser(email, pin, password)
    return res.status(201).json(result)
  } catch (err: any) {
    return res.status(err.statusCode).json({ message: err.message })
  }
}

export const loggingIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body
  try {
    const result = await loggingUser(email, password)
    return res.status(201).json(result)
  } catch (err: any) {
    return res.status(err.statusCode).json({ message: err.message })
  }
}

export const loggingOut = (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
  res.sendStatus(200)
}
