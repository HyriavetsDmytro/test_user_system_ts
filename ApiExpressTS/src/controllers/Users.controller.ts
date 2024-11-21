import { Request, Response } from 'express'
import { UserNotFoundError } from '../entity/errors'
import {
  addNewUserServ,
  getUserByEmailServ,
  getUserByParamsServ,
  getUsersServ,
} from '../services/Users.service'

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getUsersServ()

    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal Server error')
  }
}
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const response = await getUserByEmailServ(email)

    if (response[0] === undefined) {
      throw new UserNotFoundError(email)
    }
    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}

export const getUserByParams = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const data = req.body
  try {
    const response = await getUserByParamsServ(data)
    return res.json(response)
  } catch (error: any) {
    console.error(error)
    return res.status(error.statusCode).json({ message: error.message })
  }
}

export const addNewUser = async (req: Request, res: Response) => {
  const data = req.body
  try {
    await addNewUserServ(data)
    return res.status(201).json({ message: 'New User created successfully' })
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}
