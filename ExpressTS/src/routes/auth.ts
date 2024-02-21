
import * as bcrypt from "bcrypt";
import { createJSONToken, isValidPassword } from '../util/auth';
import { getUserByEmail, updatePw } from '../data/db_query';
import env from "dotenv";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
env.config();
const saltRounds = parseInt(process.env.SALT_ROUND!);
const KEY: string = process.env.KEY!;
import { Request, Response, NextFunction, Router } from 'express';
import { IsValidReq } from '../util/validation';
import Controller from '../interfaces/controller_interface';
import { WrongInfoError,UserNotFoundError } from '../util/errors';
import UserAuthInfo from "../types/auth_user_info";

class AuthenticationController implements Controller{
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.post(`${this.path}register`,IsValidReq, this.registration);
    this.router.post(`${this.path}login`, IsValidReq, this.loggingIn);
    this.router.post(`${this.path}logout`, this.loggingOut);

  }

  private registration = async (req: Request, res: Response, next: NextFunction) => {
    const {email,pin,password} = req.body;
    if (email===undefined ||pin===undefined ||password===undefined )
    {
      return next(new WrongInfoError());
    }
    try {
      const checkResult = await getUserByEmail(email);
      if(checkResult[0] === undefined){
        return res.status(422).json({
          message: `User with email ${email} not found`,  });
      }
      const user = checkResult[0];
     

        if(user.password === pin){
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await updatePw(email,hash)
              const authToken = this.createToken(result);
              console.log("success");
              return res.status(201)
              .json({ message: 'User registered.', email: email, token: authToken ,role: checkResult[0].role});
          }
        });
        }else{
          return res.status(403).json({ error: 'Already registered' });
        }
      
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  private loggingIn = async (req: Request, res: Response, next: NextFunction) => {
    const {email,password} = req.body;
    let user;
    try {
      const checkResult = await getUserByEmail(email);
      if(checkResult[0] === undefined){
        return res.status(422).json({
          message: `User with email ${email} not found`,  });
      }
      user = checkResult[0];
    } catch (err) {
      console.log(err);
      return next(err);
      //return res.status(401).json({ message: 'Authentication failed.', error:error });
    }

    const passwordIsValid = await isValidPassword(password,user.password);

    if (!passwordIsValid) {
      return res.status(422).json({
        message: 'Invalid credentials.',
        //errors: 'Invalid password entered.'
      });
      
    }
 
    const token = createJSONToken(email);
    return res.status(201)
    .json({ message: 'User registered.', email: email, token: token ,role: user.role});
    
  }

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.sendStatus(200);
  }
  private createToken(email: string){
    return sign({ email }, KEY, { expiresIn: '1h' });
  }

}

export default AuthenticationController;
