import { Request } from "express";
import { generateAccountNumber } from "../../utils/index.util";
import { accountNumberMax, accountNumberMin, maxRetries, userFieldsToSelectForLogin } from "../../constants/constants";
import { UserModel, UserModelType } from "../../schemas/user.schema";
import { matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import { errors, responses } from "../../utils/messages.util";
import JwtService from "../../utils/jwt.util";
import redisService from "../redis/redis.service";
import { RefreshPayload } from "../../types/index.types";
import { inject, injectable } from "tsyringe";
import FormatResponse from "../../utils/responses.util";
import { AccountModelType } from "../../schemas/accounts.schema";
import mongoose from "mongoose";

@injectable()
class AccountsService {

	constructor(@inject('AccountModel') private accountModel: AccountModelType) {
		this.accountModel = accountModel;
	}

	createAccount = async (req: Request) => {
		const accountData = matchedData(req);
		const { accountNumber, accountBalance, ...rest } = accountData;
		const accountBalanceDecimal = mongoose.Types.Decimal128.fromString(accountBalance);

		try {

			const accountNumberExists = await this.accountModel.findOne({ accountNumber });

			if (accountNumberExists) {
				return FormatResponse.badRequest(errors.accountNumberExists)
			}

			const newAccountNumber = await this.generateUniqueAccountNumber(maxRetries, accountNumberMin, accountNumberMax)

			if (!newAccountNumber) {
				return FormatResponse.internalServerError(errors.accountNumberGenerationFailed)
			}
			const accountCreated = await this.accountModel.create({ ...rest, accountNumber: newAccountNumber, accountBalance: accountBalanceDecimal });

			if (!accountCreated) {
				return FormatResponse.internalServerError(errors.accountCreationFailed)
			}

			return FormatResponse.created(responses.accountCreationSuccess, accountCreated)

		} catch (error) {
			console.error({ error });
			return FormatResponse.internalServerError()
		}
	}

	deposit = async (req: Request) => {
		const transactionData = matchedData(req);
		const { accountNumber, accountBalance, ...rest } = transactionData;
		const accountBalanceDecimal = mongoose.Types.Decimal128.fromString(accountBalance);

		try {

			const accountNumberExists = await this.accountModel.findOne({ accountNumber });

			if (accountNumberExists) {
				return FormatResponse.badRequest(errors.accountNumberExists)
			}

			const newAccountNumber = await this.generateUniqueAccountNumber(maxRetries, accountNumberMin, accountNumberMax)

			if (!newAccountNumber) {
				return FormatResponse.internalServerError(errors.accountNumberGenerationFailed)
			}
			const accountCreated = await this.accountModel.create({ ...rest, accountNumber: newAccountNumber, accountBalance: accountBalanceDecimal });

			if (!accountCreated) {
				return FormatResponse.internalServerError(errors.accountCreationFailed)
			}

			return FormatResponse.created(responses.accountCreationSuccess, accountCreated)

		} catch (error) {
			console.error({ error });
			return FormatResponse.internalServerError()
		}
	}



	generateUniqueAccountNumber = async (maxRetries: number, accountNumberMin: number, accountNumberMax: number) => {
		let count = 0
		let generatedAccountNumber = null;
		let existingAccountNumber = null;

		try {
			while (count < maxRetries) {
				generatedAccountNumber = generateAccountNumber(accountNumberMin, accountNumberMax)
				existingAccountNumber = await this.accountModel.findOne({ accountNumber: generatedAccountNumber })
				if (!existingAccountNumber) {  //check if exists 
					return generatedAccountNumber;
				}
				count++
			}
		} catch (error) {
			console.error({ error });
			return FormatResponse.internalServerError()
		}

	}

}

export default AccountsService;
