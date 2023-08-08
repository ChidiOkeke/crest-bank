

import { Router } from "express";
import { checkRequestErrors } from "../utils/index.util";
import { loginValidator, signupValidator } from "../middlewares/validators/auth.validator";
import refreshMiddleware from "../middlewares/refresh.middleware";
import authController from "../controllers/auth/auth.controller";
import { container } from "tsyringe";

const router = Router();

const auth =  container.resolve(authController)

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