

import { Router } from "express";
import { historyValidator, transferValidator } from "../middlewares/validators/transactions.validator";
import { checkRequestErrors } from "../utils/index.util";
import { transactionsController } from "./containers/transactions";
import { authMiddleware } from "./containers/auth";
import { AuthorizationActions, AuthorizationPermissions } from "../types/index.types";

const router = Router();

const checkInitiateTransferPermission = authMiddleware.hasPermission(AuthorizationActions.INITIATE, AuthorizationPermissions.TRANSFER)
const checkViewTransactionHistoryPermission = authMiddleware.hasPermission(AuthorizationActions.VIEW, AuthorizationPermissions.HISTORY)


router.post(
  "/transfer",
  authMiddleware.requiresAuth,
  transferValidator,
  checkRequestErrors,
  checkInitiateTransferPermission,
  transactionsController.transfer
);

router.post(
  "/history",
  authMiddleware.requiresAuth,
  historyValidator,
  checkRequestErrors,
  checkViewTransactionHistoryPermission,
  transactionsController.transactionHistory
);


export default router;