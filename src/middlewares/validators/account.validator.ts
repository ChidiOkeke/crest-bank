import { check } from "express-validator";
import { AccountType as accountTypeOptions, AccountStatus } from "../../types/index.types";

const accountTypes = Object.values(accountTypeOptions);
const accountStatuses = Object.values(AccountStatus);


export const createAccountValidator = [
    check("user")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("User is required"),
    check("accountType")
        .exists()
        .notEmpty()
        .isString()
        .isIn(accountTypes)
        .withMessage(`Account type must be in: ${accountTypes}`),
    check("accountStatus")
        .exists()
        .notEmpty()
        .isString()
        .isIn(accountStatuses)
        .withMessage(`Account status must be in: ${accountStatuses}`),
    check("accountBalance")
        .isString()
        .withMessage(`Account balance must be a number`)

];
