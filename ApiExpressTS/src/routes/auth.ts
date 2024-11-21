import { Router } from 'express'
import { IsValidReq } from '../utils/validation'
import Controller from '../entity/controller_interface'
import {
  loggingIn,
  loggingOut,
  registration,
} from '../controllers/Auth.controller'

class AuthenticationController implements Controller {
  public path = '/'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, IsValidReq, registration)
    this.router.post(`${this.path}login`, IsValidReq, loggingIn)
    this.router.post(`${this.path}logout`, loggingOut)
  }
}

export default AuthenticationController
