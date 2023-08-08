import { injectable, inject } from 'tsyringe';
import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth/auth.service";
import { RefreshPayload } from "../../types/index.types";

@injectable()
class AuthController {

  constructor(@inject(AuthService) private authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await this.authService.login(req);

      return res.status(statusCode).send(body);
      
    } catch (error) {
      next(error);
    }
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await this.authService.register(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, id, refresh }: RefreshPayload = req.body

      const { statusCode, body } = await this.authService.refresh({email, id, refresh});

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;