"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const index_types_1 = require("../../types/index.types");
const accounts = Object.values(index_types_1.AccountType);
const roles = Object.values(index_types_1.UserRoles);
exports.signupValidator = [
    (0, express_validator_1.check)('firstName')
        .exists()
        .notEmpty()
        .withMessage(`Firstname is required`)
        .trim(),
    (0, express_validator_1.check)('lastName')
        .exists()
        .notEmpty()
        .withMessage(`Lastname is required`)
        .trim(),
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isEmail()
        .withMessage("Email is required")
        .trim(),
    (0, express_validator_1.check)("password")
        .exists()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .trim(),
    (0, express_validator_1.check)("phoneNumber")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("Phone number is required")
        .trim(),
    (0, express_validator_1.check)("businessName")
        .isString()
        .withMessage("Business name should be a string")
        .trim(),
    (0, express_validator_1.check)("role")
        .exists()
        .notEmpty()
        .isIn(roles)
        .withMessage(`User role must be in: ${roles}`)
        .trim(),
];
exports.loginValidator = [
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isEmail()
        .withMessage("Email is required")
        .trim(),
    (0, express_validator_1.check)("password")
        .exists()
        .notEmpty()
        .withMessage("Password is required")
        .trim(),
];
