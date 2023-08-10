"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountValidator = void 0;
const express_validator_1 = require("express-validator");
const index_types_1 = require("../../types/index.types");
const accountTypes = Object.values(index_types_1.AccountType);
const accountStatuses = Object.values(index_types_1.AccountStatus);
exports.createAccountValidator = [
    (0, express_validator_1.check)("user")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("User is required"),
    (0, express_validator_1.check)("accountType")
        .exists()
        .notEmpty()
        .isString()
        .isIn(accountTypes)
        .withMessage(`Account type must be in: ${accountTypes}`),
    (0, express_validator_1.check)("accountStatus")
        .exists()
        .notEmpty()
        .isString()
        .isIn(accountStatuses)
        .withMessage(`Account status must be in: ${accountStatuses}`),
    (0, express_validator_1.check)("accountBalance")
        .isString()
        .withMessage(`Account balance must be a number`)
];
