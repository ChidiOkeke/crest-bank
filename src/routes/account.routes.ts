

import { Router } from "express";
import { createAccountValidator } from "../middlewares/validators/account.validator";
import { checkRequestErrors } from "../utils/index.util";
import { accountsController } from "./containers/accounts";
import { authMiddleware } from "./containers/auth";
import { AuthorizationActions, AuthorizationPermissions } from "../types/index.types";

const router = Router();

const checkCreateAccountPermission = authMiddleware.hasPermission(AuthorizationActions.CREATE, AuthorizationPermissions.ACCOUNT)

router.post(
	"/",
	// authMiddleware.requiresAuth,
	createAccountValidator,
	checkRequestErrors,
	checkCreateAccountPermission,
	accountsController.create
);


export default router;