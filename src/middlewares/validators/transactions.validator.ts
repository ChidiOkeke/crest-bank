import { check } from "express-validator";

export const transferValidator = [
    check("user")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("User id is required")
        .trim(),
    check("beneficiary")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Recipient id is required")
        .trim(),
    check("userAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Sender account number is required")
        .trim(),
    check("beneficiaryAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Beneficiary account number is required")
        .trim(),
    check("amount")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Amount is required")
        .trim(),
];
