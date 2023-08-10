"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyValidator = exports.transferValidator = void 0;
const express_validator_1 = require("express-validator");
exports.transferValidator = [
    (0, express_validator_1.check)("user")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("User id is required")
        .trim(),
    (0, express_validator_1.check)("beneficiary")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Recipient id is required")
        .trim(),
    (0, express_validator_1.check)("userAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Sender account number is required")
        .trim(),
    (0, express_validator_1.check)("beneficiaryAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Beneficiary account number is required")
        .trim(),
    (0, express_validator_1.check)("amount")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Amount is required")
        .trim(),
];
exports.historyValidator = [
    (0, express_validator_1.check)("user")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("User id is required")
        .trim(),
    (0, express_validator_1.check)("userAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Sender account number is required")
        .trim(),
    (0, express_validator_1.check)("beneficiaryAccountNumber")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Beneficiary account number is required")
        .trim(),
];
