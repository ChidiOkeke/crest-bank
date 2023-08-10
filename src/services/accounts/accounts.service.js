"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_util_1 = require("../../utils/index.util");
const constants_1 = require("../../constants/constants");
const express_validator_1 = require("express-validator");
const messages_util_1 = require("../../utils/messages.util");
const tsyringe_1 = require("tsyringe");
const responses_util_1 = __importDefault(require("../../utils/responses.util"));
const mongoose_1 = __importDefault(require("mongoose"));
let AccountsService = class AccountsService {
    constructor(accountModel) {
        this.accountModel = accountModel;
        this.createAccount = (req) => __awaiter(this, void 0, void 0, function* () {
            const accountData = (0, express_validator_1.matchedData)(req);
            const { accountNumber, accountBalance } = accountData, rest = __rest(accountData, ["accountNumber", "accountBalance"]);
            const accountBalanceDecimal = mongoose_1.default.Types.Decimal128.fromString(accountBalance);
            try {
                const accountNumberExists = yield this.accountModel.findOne({ accountNumber });
                if (accountNumberExists) {
                    return responses_util_1.default.badRequest(messages_util_1.errors.accountNumberExists);
                }
                const newAccountNumber = yield this.generateUniqueAccountNumber(constants_1.maxRetries, constants_1.accountNumberMin, constants_1.accountNumberMax);
                if (!newAccountNumber) {
                    return responses_util_1.default.internalServerError(messages_util_1.errors.accountNumberGenerationFailed);
                }
                const accountCreated = yield this.accountModel.create(Object.assign(Object.assign({}, rest), { accountNumber: newAccountNumber, accountBalance: accountBalanceDecimal }));
                if (!accountCreated) {
                    return responses_util_1.default.internalServerError(messages_util_1.errors.accountCreationFailed);
                }
                return responses_util_1.default.created(messages_util_1.responses.accountCreationSuccess, accountCreated);
            }
            catch (error) {
                console.error({ error });
                return responses_util_1.default.internalServerError();
            }
        });
        this.deposit = (req) => __awaiter(this, void 0, void 0, function* () {
            const transactionData = (0, express_validator_1.matchedData)(req);
            const { accountNumber, accountBalance } = transactionData, rest = __rest(transactionData, ["accountNumber", "accountBalance"]);
            const accountBalanceDecimal = mongoose_1.default.Types.Decimal128.fromString(accountBalance);
            try {
                const accountNumberExists = yield this.accountModel.findOne({ accountNumber });
                if (accountNumberExists) {
                    return responses_util_1.default.badRequest(messages_util_1.errors.accountNumberExists);
                }
                const newAccountNumber = yield this.generateUniqueAccountNumber(constants_1.maxRetries, constants_1.accountNumberMin, constants_1.accountNumberMax);
                if (!newAccountNumber) {
                    return responses_util_1.default.internalServerError(messages_util_1.errors.accountNumberGenerationFailed);
                }
                const accountCreated = yield this.accountModel.create(Object.assign(Object.assign({}, rest), { accountNumber: newAccountNumber, accountBalance: accountBalanceDecimal }));
                if (!accountCreated) {
                    return responses_util_1.default.internalServerError(messages_util_1.errors.accountCreationFailed);
                }
                return responses_util_1.default.created(messages_util_1.responses.accountCreationSuccess, accountCreated);
            }
            catch (error) {
                console.error({ error });
                return responses_util_1.default.internalServerError();
            }
        });
        this.generateUniqueAccountNumber = (maxRetries, accountNumberMin, accountNumberMax) => __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            let generatedAccountNumber = null;
            let existingAccountNumber = null;
            try {
                while (count < maxRetries) {
                    generatedAccountNumber = (0, index_util_1.generateAccountNumber)(accountNumberMin, accountNumberMax);
                    existingAccountNumber = yield this.accountModel.findOne({ accountNumber: generatedAccountNumber });
                    if (!existingAccountNumber) { //check if exists 
                        return generatedAccountNumber;
                    }
                    count++;
                }
            }
            catch (error) {
                console.error({ error });
                return responses_util_1.default.internalServerError();
            }
        });
        this.accountModel = accountModel;
    }
};
AccountsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AccountModel')),
    __metadata("design:paramtypes", [Object])
], AccountsService);
exports.default = AccountsService;
