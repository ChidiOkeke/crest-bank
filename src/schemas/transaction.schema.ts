import mongoose, { Model, model, Schema, Types } from "mongoose";
import { AccountStatus, AccountType, UserRoles } from "../types/index.types";

export interface TransactionModel extends Document {
    fromUser: string,
    toUser: string,
    amount: number
}

const TransactionSchema = new Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction: Model<TransactionModel> = model<TransactionModel>(
  "Transaction",
  TransactionSchema
);
export default Transaction;
