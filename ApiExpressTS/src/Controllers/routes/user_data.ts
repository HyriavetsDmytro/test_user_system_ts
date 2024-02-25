import {  Router } from 'express';
import { addNewUser, getUsers, getUserByParams } from '../data/db_query';
import { IsValidReq } from '../../Services/validation';
import Controller from '../../Entity/controller_interface';
import { checkAuthMiddleware } from '../auth';

class UserDataController implements Controller{
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}new`,checkAuthMiddleware, IsValidReq, addNewUser);
    this.router.get(`${this.path}`, checkAuthMiddleware, getUsers);
    this.router.post(`${this.path}search`,checkAuthMiddleware,IsValidReq,getUserByParams);
  }
}

export default UserDataController;




















//module.exports = router;