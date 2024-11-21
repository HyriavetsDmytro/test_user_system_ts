import * as bcrypt from 'bcrypt'
import { createJSONToken, isValidPassword } from '../utils/auth_validation'
import { updatePw } from './Users.service'
import { Request, Response, NextFunction, Router } from 'express'
import {
  ExistUserError,
  UserNotFoundError,
  WrongInfoError,
} from '../entity/errors'
import { createToken } from '../utils/util'
import env from 'dotenv'
import { getUserByEmailRepo } from '../repositories/Users.repository'

env.config()
const saltRounds = parseInt(process.env.SALT_ROUND || '10')
export const registerUser = async (
  email: string,
  pin: string,
  password: string,
) => {
  const checkResult = await getUserByEmailRepo(email)
  if (checkResult.length === 0) {
    throw new UserNotFoundError(email)
  }
  const user = checkResult[0]
  if (user.password === pin) {
    const hash = await bcrypt.hash(password, saltRounds)

    const result = await updatePw(email, hash)
    const authToken = createToken(result)

    return {
      message: 'User registered.',
      email: email,
      token: authToken,
      role: user.role,
    }
  } else {
    throw new ExistUserError(email)
  }
}

export const loggingUser = async (email: string, password: string) => {
  const checkResult = await getUserByEmailRepo(email)
  if (checkResult[0] === undefined) {
    throw new UserNotFoundError(email)
  }
  let user = checkResult[0]

  const passwordIsValid = await isValidPassword(password, user.password)

  if (!passwordIsValid) {
    throw new WrongInfoError()
  }

  const token = createJSONToken(email)
  return {
    message: 'User registered.',
    email: email,
    token: token,
    role: user.role,
  }
}
