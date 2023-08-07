

import { Router } from "express";
import { checkRequestErrors } from "../utils/index.util";
import { loginValidator, signupValidator } from "../middlewares/validators/auth.validator";
import refreshMiddleware from "../middlewares/refresh.middleware";
import authController from "../controllers/auth/auth.controller";

const router = Router();

router.post(
  "/register",
  signupValidator,
  checkRequestErrors,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  checkRequestErrors,
  authController.login
);

router.post(
  "/refresh", 
  refreshMiddleware, 
  authController.refresh
);

export default router;