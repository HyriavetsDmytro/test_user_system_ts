import { Router } from 'express'
import {
  addNewUser,
  getUsers,
  getUserByParams,
} from '../controllers/Users.controller'
import { IsValidReq } from '../utils/validation'
import Controller from '../entity/controller_interface'
import { checkAuthMiddleware } from '../middleware/auth'

class UserDataController implements Controller {
  public path = '/'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}new`,
      checkAuthMiddleware,
      IsValidReq,
      addNewUser,
    )
    this.router.get(`${this.path}`, checkAuthMiddleware, getUsers)
    this.router.post(
      `${this.path}search`,
      checkAuthMiddleware,
      IsValidReq,
      getUserByParams,
    )
  }
}

export default UserDataController
