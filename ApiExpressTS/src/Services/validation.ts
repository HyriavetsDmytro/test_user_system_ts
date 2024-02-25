
import { NextFunction,Request,Response } from 'express';
import {  BaseHttpError} from '../Entity/errors';
export function isValidText(value:string, textLength = 1) {
  return value && value.trim().length >= textLength;
}
export function isValidPin(value:string) {
  return value && value.trim().length === 4;
}

export function isValidDate(dateString:string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function isValidImageUrl(value:string) {
  return value && value.startsWith('http');
}
export function isValidEmail(value:string) {
  return value && value.includes('@');
}
export function IsValidReq (req :Request, res: Response, next: NextFunction) {
  const data = req.body;
  let errors: string = '';
  //console.log(data);
  for (const property in data) {
    if(property==='email'){
      if (!isValidEmail(data[property])) {
        errors += 'Invalid email. ';
      }
    }
    else if(property==='pin'){
      if (!isValidPin(data[property])) {
        errors += 'Invalid pin. ';
      }
    }
    else if(property==='date_birth'){
      if (!isValidDate(data[property])) {
        errors += 'Invalid date. ';
      }
    } else{
      if (!isValidText(data[property], 1)) {
        errors +=`Invalid ${property}. `;
      }
    }
    }
    //console.log(errors)

    if (Object.keys(errors).length > 0) {
       return next(new BaseHttpError(401,errors));
    }
     next();
  }