import { Request } from "express";
import { Model } from "mongoose";
import { formatResponse } from "../../utils/index.util";
import transactionModel , {TransactionModel} from "../../schemas/transaction.schema";
import { matchedData } from "express-validator";
import httpStatus from "http-status";
import { errors, responses, status } from "../../utils/messages.util";
import userModel, { UserModel } from "../../schemas/user.schema";

class TransactionsService {
  static transactionModel: Model<TransactionModel> = transactionModel;
  static userModel: Model<UserModel> = userModel;


  static transfer = async (req: Request) => {
    const transferData = matchedData(req);
    const { fromUser, toUser, amount } = transferData;

    try {

      console.log({fromUser, toUser, amount})

      const sender = await TransactionsService.userModel.findById(fromUser)
     
      if(!sender){
        return formatResponse(httpStatus.NOT_FOUND, errors.senderNotFound, status.failed);
      }

      const beneficiary = await TransactionsService.userModel.findById(toUser);

      if(!beneficiary){
        return formatResponse(httpStatus.NOT_FOUND, errors.beneficiaryNotFound, status.failed);
      }

      console.log({sender, beneficiary})

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
