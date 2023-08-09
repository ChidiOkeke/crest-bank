

import { Router } from "express";
import { checkRequestErrors } from "../utils/index.util";
import { loginValidator, signupValidator } from "../middlewares/validators/auth.validator";
import refreshMiddleware from "../middlewares/refresh.middleware";
import { authController, authMiddleware } from "./containers/auth";

//routing
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
  authMiddleware.requiresAuth,
  refreshMiddleware, 
  authController.refresh
);

export default router;