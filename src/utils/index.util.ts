import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  validationResult,
} from "express-validator";

import { Tokens } from "../types/index.types";

export const messageLogger = (error: string | null, success: string) => {
  if (error) {
    console.error(`\x1b[31m` + error);
  } else {
    console.log(`\x1b[32m` + success);
  }
};

export const formatResponse = (
  statusCode: number,
  message: string,
  success: boolean,
  data?: any,
  tokens?: Tokens,
) => {
  return {
    statusCode,
    body: {
      success,
      message,
      data,
      tokens,
    }
  };
}


export const checkRequestErrors: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gather errors and return. Continue execution if no error
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(422).send({
    errors: result.array(),
    error: true,
    statusCode: 422,
    message: "Invalid body request",
  });
};
;

export const generateAccountNumber = (min:number,max:number)=> {

  return Math.floor(Math.random() * (max - min + 1)) + min;
  
}