import { check } from "express-validator";
import { UserRoles, AccountType as accountTypeOptions } from "../../types/index.types";
import { Request, Response, NextFunction } from "express";

const accounts = Object.values(accountTypeOptions);
const roles = Object.values(UserRoles);

export const signupValidator = [

    check('firstName')
        .exists()
        .notEmpty()
        .withMessage(`Firstname is required`)
        .trim(),
    check('lastName')
        .exists()
        .notEmpty()
        .withMessage(`Lastname is required`)
        .trim(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail()
        .withMessage("Email is required")
        .trim(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .trim(),
    check("phoneNumber")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("Phone number is required")
        .trim(),
    check("businessName")
        .isString()
        .withMessage("Business name should be a string")
        .trim(),
    check("role")
        .exists()
        .notEmpty()
        .isIn(roles)
        .withMessage(`User role must be in: ${roles}`)
        .trim(),
];

export const loginValidator = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail()
        .withMessage("Email is required")
        .trim(),
    check("password")
        .exists()
        .notEmpty()
        .withMessage("Password is required")
        .trim(),
];
