import mongoose, { Model, model, Schema } from "mongoose";
import { defaultTransferAmount } from "../constants/constants";

export interface TransactionModel extends Document {
  user: string;
  beneficiary: string;
  userAccountNumber:string,
  beneficiaryAccountNumber: string,
  amount: number;
}

const TransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    userAccountNumber: {
      type: String,
      required: true,
      default: null,
    },
    beneficiaryAccountNumber: {
      type: String,
      required: true,
      default: null,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      default: defaultTransferAmount,
    },
  },
  { timestamps: true }
);

const Transaction: Model<TransactionModel> = model<TransactionModel>(
  "Transaction",
  TransactionSchema
);

export type TransactionModelType = Model<TransactionModel>;

export default Transaction;
