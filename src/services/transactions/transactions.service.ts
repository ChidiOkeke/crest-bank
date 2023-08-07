import { Request } from "express";
import { Model } from "mongoose";
import { formatResponse } from "../../utils/index.util";
import transactionModel from "../../schemas/transaction.schema";
import { matchedData } from "express-validator";
import httpStatus from "http-status";
import { errors, responses, status } from "../../utils/messages.util";
import { TransactionModel } from "../../schemas/transaction.schema";

class TransactionsService {
  static model: Model<TransactionModel> = transactionModel;

  static transfer = async (req: Request) => {
    const transferData = matchedData(req);
    const { fromUser, toUser, amount } = transferData;

    try {
      return formatResponse(
        httpStatus.OK,
        responses.transferSuccess,
        status.success
      );
    } catch (error) {
      console.error({ error });
      return formatResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        errors.internalServerError,
        status.failed
      );
    }
  };
}

export default TransactionsService;
