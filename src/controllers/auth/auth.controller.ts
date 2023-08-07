
import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth/auth.service";
import { RefreshPayload } from "../../types/index.types";

class AuthController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await AuthService.login(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await AuthService.register(req);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, id, refresh }: RefreshPayload = req.body

      const request = { email, id, refresh }
      
      const {statusCode, body} = await AuthService.refresh(request);

      return res.status(statusCode).send(body);

    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();