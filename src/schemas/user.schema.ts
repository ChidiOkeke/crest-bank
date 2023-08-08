import { Model, model, Schema, Types } from "mongoose";
import { AccountStatus, AccountType, UserRoles } from "../types/index.types";


export interface UserModel extends Document {
  firstName: string;
  lastName: string;  
  email: string;
  phoneNumber: string;
  password: string;
  businessName?: string;
  accountType: string;
  accountStatus: string;
  accountBalance: number;
  accountNumber: string;
  role: string;
}

const UserSchema = new Schema(
  {
    role: {
      required: true,
      type: String,
      enum: UserRoles,
      default: UserRoles.CUSTOMER
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    accountType: {
      type: String,
      enum: AccountType,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: false,
      default: null,
    },
    accountStatus: {
      type: String,
      enum: AccountStatus,
      default: AccountStatus.ACTIVE,
    },
    accountBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    accountNumber: {
      type: String,
      required: true,
      default: null,
      unique: true
    },
  },
  { timestamps: true }
);

const User: Model<UserModel> = model<UserModel>(
  "User",
  UserSchema
);

export type UserModelType = Model<UserModel>;

export default User;


