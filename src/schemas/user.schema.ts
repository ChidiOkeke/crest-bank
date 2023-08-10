import { Model, model, Schema, Types } from "mongoose";
import { AccountStatus, AccountType, UserRoles } from "../types/index.types";


export interface UserModel extends Document {
  firstName: string;
  lastName: string;  
  email: string;
  phoneNumber: string;
  password: string;
  businessName?: string;
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
      default: null,
    },
    password: {
      type: String,
      required: true,
      default: null
    },
    phoneNumber: {
      type: String,
      required: true,
      default: null,
    },
    firstName: {
      type: String,
      required: true,
      default: null,
    },
    lastName: {
      type: String,
      required: true,
      default: null,
    },
    businessName: {
      type: String,
      required: false,
      default: null,
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


