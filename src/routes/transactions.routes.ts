

import { Router } from "express";
import TransactionsController from "../controllers/transactions/transactions.controller";
import { transferValidator } from "../middlewares/validators/transactions.validator";
import { checkRequestErrors } from "../utils/index.util";


const router = Router();

router.post(
  "/transfer",
  transferValidator,
  checkRequestErrors,
  TransactionsController.transfer
);


export default router;