import { pool } from './db_con';
import { NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';
import {ExistUserError,WrongInfoError, UserNotFoundError,BaseHttpError} from '../util/errors'

  export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT email,role FROM user_auth');
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }
  export const getUserByEmail = async (email : string)=> {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM user_auth WHERE email = $1', [email]);

      if(response.rows.length === 0){
        throw new UserNotFoundError(email);
      }
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
      //throw new BaseHttpError(500,'Internal Server error');
    }
  }


  export const getUserByParams = async (req: Request, res: Response): Promise<Response> => {

    const data = req.body;
    
    let hasEmail = data.hasOwnProperty('email');
    let hasFirstName = data.hasOwnProperty('first_name');
    let hasLastName = data.hasOwnProperty('last_name');
    if(hasEmail||hasFirstName||hasLastName){
    let query_search="SELECT a.email,a.role,first_name, last_name,date_birth FROM user_auth a Join user_data b on a.email=b.email ";
  let check = false;
  for (const property in data) {
   
    if(check){
      query_search +=` And ${property==='email'? `a.`:``}${property} = '${data[property]}'`;
      
    }
    else{
      query_search +=` WHERE ${property==='email'? `a.`:``}${property} = '${data[property]}'`;
      check = true;
    }
  }

  try {
    const response: QueryResult = await pool.query(query_search);
    if(response.rows.length!==0){
    return res.json(response.rows);}
    else{
      return res.status(404).json({message:'There is no such user, check your input'});}
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal Server error');
  }}
  else{
    return res.status(422).json({
      message: 'input someting.',
    });
  }
}

  export const updatePw = async (email:string, password:string) => {
    try {
      await pool.query("UPDATE user_auth SET password= $1 WHERE email= $2",
      [password,email]
    );
    } catch (error) {
   
      console.error(error);
      throw new BaseHttpError(500,'Internal Server error');
    }
    return email;
  }
  export const addNewUser = async (req: Request, res: Response,next: NextFunction) => {
    
    const data = req.body;

    let hasEmail = data.hasOwnProperty('email');
    let hasFirstName = data.hasOwnProperty('first_name');
    let hasLastName = data.hasOwnProperty('last_name');
    let hasPin = data.hasOwnProperty('pin');
    let hasRole = data.hasOwnProperty('role');
    let hasDateBirth = data.hasOwnProperty('date_birth');
    if(hasEmail&&hasFirstName&&hasLastName&&hasRole&&hasDateBirth&&hasPin){
      const { role, email, pin, first_name, last_name,date_birth} =data;


    
    const checkResult = await pool.query("SELECT * FROM user_auth WHERE email = $1", [email,]);
    //console.log(checkResult)
      
      if (checkResult.rows.length !== 0 ){
        return next (new ExistUserError(email));
        }
        const client = await pool.connect()
        try {
          await client.query('BEGIN')
          const queryText = "INSERT INTO user_auth (email, password, role) VALUES ($1, $2, $3)";
          await client.query(queryText, [email,pin, role])
          const insertQueryText = "INSERT INTO user_data (email,first_name, last_name, date_birth) VALUES ($1, $2, $3, $4);"
          const insertQueryValues = [email,first_name,last_name,date_birth]
          await client.query(insertQueryText, insertQueryValues)
          await client.query('COMMIT')
        } catch (e) {
          await client.query('ROLLBACK')
          return next( e)
        } 
        client.release()

    return res.status(201).json({message: 'New User created successfully'});}
    else{
      next (new WrongInfoError);
    }
    next();
  };