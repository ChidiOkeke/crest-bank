import { check } from "express-validator";

export const transferValidator = [
    check("fromUser")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Sender is required")
        .trim(),
    check("toUser")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Beneficiary is required")
        .trim(),
];
