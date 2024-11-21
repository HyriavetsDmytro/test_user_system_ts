import { NextFunction, Request, Response } from 'express'
import {
  ExistUserError,
  WrongInfoError,
  UserNotFoundError,
  BaseHttpError,
} from '../entity/errors'
import UserAuthInfo from '../entity/auth_user_info'
import { Knex } from 'knex'
import db from '../../db/db'
import {
  addNewUserRepo,
  getUserByEmailRepo,
  getUserByParamsRepo,
  getUsersRepo,
} from '../repositories/Users.repository'

export const getUsersServ = async () => {
  return await getUsersRepo()
}
export const getUserByEmailServ = async (email: string) => {
  return await getUserByEmailRepo(email)
}

export const getUserByParamsServ = async (data: any) => {
  if (data) {
    const result = await getUserByParamsRepo(data)

    if (result[0] !== undefined) {
      return result
    }
  }
  throw new WrongInfoError()
}

export const updatePw = async (email: string, password: string) => {
  try {
    await db('user_auth').where({ email }).update({ password })
  } catch (error) {
    console.error(error)
    throw new BaseHttpError(500, 'Internal Server error')
  }
  return email
}
export const addNewUserServ = async (data: any) => {
  if (data) {
    const checkResult = await getUserByEmailRepo(data.email)
    if (checkResult.length !== 0) {
      throw new ExistUserError(data.email)
    }
    return await addNewUserRepo(data)
  }
  throw new WrongInfoError()
}
