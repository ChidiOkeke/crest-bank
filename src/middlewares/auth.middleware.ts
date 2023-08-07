import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { errors, status } from "../utils/messages.util";


export function requiresAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: status.failed,
      message: errors.noAuthorizationHeader,
    });
  }

  const [authorization, token] = req.headers.authorization.split(" ");
  if (authorization !== process.env.JWT_TYPE) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: status.failed,
      message: errors.invalidAuthorizationHeader,
    });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    req.body.user = jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(httpStatus.FORBIDDEN).json({
      status: status.failed,
      message: errors.authorizationError,
    });
  }
}
