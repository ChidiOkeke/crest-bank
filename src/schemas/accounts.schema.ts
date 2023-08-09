import mongoose, { Model, model, Schema } from "mongoose";
import { AccountStatus, AccountType } from "../types/index.types";
import { accountOpeningDefaultBanalce } from "../constants/constants";


export interface AccountModel extends Document {
  accountNumber: string;
  user: string;
  accountType: string;
  accountBalance: number;
  accountStatus: string;
}

export type AccountModelType = Model<AccountModel>;

const AccountSchema = new Schema(
  {
    accountNumber: {
      unique: true,
      type: String,
      required: true,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    accountType: { type: String, required: true, default: null },
    accountBalance: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      default: accountOpeningDefaultBanalce,
    },
    accountStatus: {
      type: String,
      required: true,
      default: AccountStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const Account: AccountModelType = model<AccountModel>("Account", AccountSchema);

export default Account;
