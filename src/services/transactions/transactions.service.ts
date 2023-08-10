import { Request } from "express";
import { matchedData } from "express-validator";
import { errors, responses } from "../../utils/messages.util";
import { UserModelType } from "../../routes/schemas/user.schema";
import { inject, injectable } from "tsyringe";
import { TransactionModelType } from "../../routes/schemas/transaction.schema";
import FormatResponse from "../../utils/responses.util";
import { canTransfer, totalPages } from "../../utils/index.util";
import { AccountModelType } from "../../routes/schemas/accounts.schema";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { TransactionHistoryQuery, UserRoles } from "../../types/index.types";

@injectable()
class TransactionsService {
	constructor(
		@inject("AccountModel") private accountModel: AccountModelType,
		@inject("UserModel") private userModel: UserModelType,
		@inject("TransactionModel") private transactionModel: TransactionModelType,
		@inject("MongooseConnection")
		private readonly connection: mongoose.Connection
	) {
		this.accountModel = accountModel;
		this.transactionModel = transactionModel;
		this.userModel = userModel;
		this.connection = connection;
	}

	transfer = async (req: Request) => {
		const transferData = matchedData(req);
		const {
			user,
			beneficiary,
			userAccountNumber,
			beneficiaryAccountNumber,
			amount,
		} = transferData;
		const transferAmountNumber = Number(amount);

		try {
			const senderUser = await this.userModel.findById(user);

			if (!senderUser) {
				return FormatResponse.notFound(errors.senderNotFound);
			}

			const beneficiaryUser = await this.userModel.findById(beneficiary);

			if (!beneficiaryUser) {
				return FormatResponse.notFound(errors.beneficiaryNotFound);
			}

			const senderAccount = await this.accountModel.findOne({
				accountNumber: userAccountNumber,
				user: new ObjectId(user),
			});

			if (!senderAccount) {
				return FormatResponse.notFound(errors.senderAccountNotFound);
			}

			const beneficiaryAccount = await this.accountModel.findOne({
				accountNumber: beneficiaryAccountNumber,
				user: beneficiary,
			});

			if (!beneficiaryAccount) {
				return FormatResponse.notFound(errors.beneficiaryAccountNotFound);
			}

			//pre-transfer checks
			const transferErrorChecks = canTransfer(
				senderAccount,
				beneficiaryAccount,
				transferAmountNumber
			);

			if (transferErrorChecks.error) {
				return FormatResponse.badRequest(transferErrorChecks.error);
			}

			//move funds
			return await this.moveFunds({
				...transferData,
				amount: transferAmountNumber,
			});
		} catch (error) {
			console.error({ error });
			return FormatResponse.internalServerError();
		}
	};

	moveFunds = async (transferData: Record<string, any>) => {
		const {
			user,
			beneficiary,
			userAccountNumber,
			beneficiaryAccountNumber,
			amount,
		} = transferData;

		const session = await this.connection.startSession();

		try {
			//use transactions
			session.startTransaction();

			const senderUpdatedAccount = await this.accountModel.findOneAndUpdate(
				{ accountNumber: userAccountNumber, user },
				{ $inc: { accountBalance: -amount } },
				{ new: true }
			);

			const beneficiaryUpdatedAccount =
				await this.accountModel.findOneAndUpdate(
					{ accountNumber: beneficiaryAccountNumber, user: beneficiary },
					{ $inc: { accountBalance: amount } },
					{ new: true }
				);

			if (!senderUpdatedAccount || !beneficiaryUpdatedAccount) {
				await session.abortTransaction();
				session.endSession();
				return FormatResponse.internalServerError(errors.transactionFailed);
			}

			//add to transactions
			const newTransaction = await this.transactionModel.create({
				user,
				beneficiary,
				userAccountNumber,
				beneficiaryAccountNumber,
				amount,
			});

			if (!newTransaction) {
				await session.abortTransaction();
				session.endSession();
				return FormatResponse.internalServerError(errors.transactionFailed);
			}

			await session.commitTransaction();
			session.endSession();

			return FormatResponse.ok(responses.transferSuccess);
		} catch (error) {
			await session.abortTransaction();
			session.endSession();
			console.error({ error });
			return FormatResponse.internalServerError();
		}
	};

	transactionHistory = async (req: Request) => {

		const requestData = matchedData(req);
		const { user, userAccountNumber, beneficiaryAccountNumber } = requestData;
		const { page, limit } = req.query;
		const userRole = req.body.role;
		const pageAsNumber = Number(page);
		const limitAsNumber = Number(limit);

		let query: TransactionHistoryQuery = {
			userAccountNumber,
			beneficiaryAccountNumber,
		};

		if (userRole === UserRoles.CUSTOMER) {
			query.user = user; //only return user's history if user is not banker, admin
		}

		try {

			const history = await this.transactionModel
				.find(query)
				.skip((pageAsNumber - 1) * limitAsNumber)
				.limit(limitAsNumber);

			const totalRecords = await this.transactionModel.countDocuments(query);

			const response = {
				page: pageAsNumber,
				limit: limitAsNumber,
				total: totalRecords,
				totalPages: totalPages(totalRecords, limitAsNumber),
				data: history,
			};

			return FormatResponse.ok(responses.transactionHistorySuccess, response);

		} catch (error) {
			console.error({ error });
			return FormatResponse.internalServerError();
		}
	};
}

export default TransactionsService;
