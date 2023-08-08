

import { Router } from "express";
import { checkRequestErrors } from "../utils/index.util";
import { loginValidator, signupValidator } from "../middlewares/validators/auth.validator";
import refreshMiddleware from "../middlewares/refresh.middleware";
import { container } from "tsyringe";
import AuthController from "../controllers/auth/auth.controller";
import AuthService from "../services/auth/auth.service";
import User, {UserModelType } from "../schemas/user.schema";


container.register<AuthController>(AuthController, {
  useClass: AuthController
});
container.register<AuthService>(AuthService,{
  useClass: AuthService
});
container.register<UserModelType>('UserModel', { useFactory: () => User });

const auth =  container.resolve(AuthController)

const router = Router();

router.post(
  "/register",
  signupValidator,
  checkRequestErrors,
  auth.register
);

router.post(
  "/login",
  loginValidator,
  checkRequestErrors,
  auth.login
);

router.post(
  "/refresh", 
  refreshMiddleware, 
  auth.refresh
);

export default router;