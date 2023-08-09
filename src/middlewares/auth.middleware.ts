import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { errors, status } from "../utils/messages.util";
import { rbac as policy } from "../utils/rbac.util";
import AuthService from "../services/auth/auth.service";
import { inject, injectable } from "tsyringe";


@injectable()
class AuthMiddleware {

  rbacPolicyInitialized = false;

  constructor(@inject(AuthService) private authService: AuthService) {
    this.authService = authService;
  }

  requiresAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: status.failed,
        message: errors.noAuthorizationHeader,
      });
    }

    const [authorization, token] = req.headers.authorization.split(" ");
    if (authorization !== process.env.JWT_TYPE) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: status.failed,
        message: errors.invalidAuthorizationHeader,
      });
    }

    try {
      const secret = process.env.JWT_SECRET as string;
      req.body.user = jwt.verify(token, secret);

      return next();
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: status.failed,
        message: errors.authorizationError,
      });
    }
  };

  hasPermission = (action: string, asset: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        

        if(!this.rbacPolicyInitialized){ //init only once
          await policy.init();
          this.rbacPolicyInitialized = true;
        }

        const { user } = req.body;

        const userRole = await this.authService.resolveUserRoles(user);

        const can = await policy.can(userRole, action, asset);

        if (can) {
          next(); // proceed if authorized
        } else {
          res.status(httpStatus.FORBIDDEN).json({
              success: status.failed,
              message: errors.forbiddenResource
            });
        }
      } catch (error) {
        console.error({error})
        res.status(httpStatus.FORBIDDEN).json({
          success: status.failed,
          message: errors.forbiddenResource
        });
      }
    };
  };
}
export default AuthMiddleware;
