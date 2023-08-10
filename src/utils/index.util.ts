import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  validationResult,
} from "express-validator";
import { AccountStatus, Tokens } from "../types/index.types";
import { minimumAllowedBalanceForTransfers } from "../constants/constants";
import { errors } from "./messages.util";
import { AccountModel } from "../routes/schemas/accounts.schema";
import httpStatus from "http-status";

export const messageLogger = (error: string | null, success: string) => {
  if (error) {
    console.error(`\x1b[31m` + error);
  } else {
    console.log(`\x1b[32m` + success);
  }
};

export const checkRequestErrors: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gather errors and return. Continue execution if no error
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
    errors: result.array(),
    error: true,
    statusCode: httpStatus.UNPROCESSABLE_ENTITY,
    message: errors.invalidBodyRequest,
  });
};
;

export const generateAccountNumber = (min: number, max: number) => {

  return Math.floor(Math.random() * (max - min + 1)) + min;

}

export const differentAccountNumbers = (senderAccountNumber: string, beneficiaryAccountNumber: string) => {
  if (senderAccountNumber !== beneficiaryAccountNumber) {
    return true;
  }
  return false;
}

export const sufficientAccountBalance = (accountBalance: number, transferAmount: number) => {

  console.log({ accountBalance, transferAmount })
  const sufficientBalanceToTransfer = accountBalance >= transferAmount

  if (sufficientBalanceToTransfer) {
    return true;
  }
  return false;
}

export const accountBalanceAboveMinimum = (accountBalance: number) => {

  const accountBalanceAboveMinumum = accountBalance >= minimumAllowedBalanceForTransfers

  if (accountBalanceAboveMinumum) {
    return true;
  }
  return false;
}

export const isPositiveNumber = (amount: number) => {

  if (amount > 0) {
    return true;
  }
  return false;
}

export const isAccountActive = (accountStatus:string)=>{
  
  if(accountStatus!== AccountStatus.ACTIVE){
    return false
  }
  return true;
}
export const canTransfer = (sender: AccountModel, beneficiary: AccountModel, transferAmount: number) => {


  const { accountNumber: senderAccountNumber, accountBalance, accountStatus } = sender;
  const { accountNumber: beneficiaryAccountNumber } = beneficiary;

  const differentAccounts = differentAccountNumbers(senderAccountNumber, beneficiaryAccountNumber);
  const aboveMinimumAccountBalance = accountBalanceAboveMinimum(accountBalance);
  const sufficentFunds = sufficientAccountBalance(accountBalance, transferAmount);
  const positiveNumber = isPositiveNumber(transferAmount);
  const accountActive = isAccountActive(accountStatus)

  if(!accountActive){
    return {
      error: errors.inactiveAccount,
    }
  }
  if (!positiveNumber) {
    return {
      error: errors.invalidAmount,
    }
  }

  if (!differentAccounts) {
    return {
      error: errors.sameAccountNumber,
    }
  }

  if (!aboveMinimumAccountBalance) {
    return {
      error: errors.accountBalanceBelowMinimum,
    }
  }

  if (!sufficentFunds) {
    return {
      error: errors.insufficientFunds,
    }
  }

  return {
    errors: null
  }
};

export const totalPages = (totalRecords: number, limit: number) => {
  if (totalRecords > 0) {
    return Math.ceil(totalRecords / limit)
  }
  return 0;
}