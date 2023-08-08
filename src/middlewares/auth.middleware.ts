import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { errors, status } from "../utils/messages.util";
import { rbac } from "../utils/rbac.util";
import { Permissions } from "../types/index.types";


export const requiresAuth = (req: Request, res: Response, next: NextFunction) => {
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
    console.error(error)
    return res.status(httpStatus.FORBIDDEN).json({
      status: status.failed,
      message: errors.authorizationError,
    });
  }
}

// export const hasPermission = (req: Request, res: Response, next: NextFunction) => {

//   const { role, action, subject } = req.body;

//   console.log({ role, action, subject })

//   try {
//     const can = await rbac.can(role, action, subject);
//     if (can) {
//       console.log('Admin is able create article');
//     }
//     return next();
//   } catch (error) {
//     return res.status(httpStatus.FORBIDDEN).json({
//       status: status.failed,
//       message: errors.authorizationError,
//     });
//   }
// }

// export const rbacMiddleware = (permissions: Permissions) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { role, action, subject } = permissions;

//     console.log({ role, action, subject })

//     try {
//       const can = await rbac.can(role, action, subject);
//       if (can) {
//         console.log('Admin is able create article');
//       }
//       return next();
//     } catch (error) {
//       return res.status(httpStatus.FORBIDDEN).json({
//         status: status.failed,
//         message: errors.authorizationError,
//       });
//     }
//   }
// };
