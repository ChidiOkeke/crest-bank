import { Request, Response } from "express";
import { Model } from "mongoose";
import { formatResponse } from "../../utils/index.util";
import { userFieldsToSelectForLogin } from "../../constants/constants";
import userModel, { UserModel } from "../../schemas/user.schema";
import { matchedData } from "express-validator";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { errors, responses, status } from "../../utils/messages.util";
import JwtService from "../../utils/jwt.util";
import redisService from "../redis/redis.service";
import { RefreshPayload } from "../../types/index.types";

class AuthService {
  static model: Model<UserModel> = userModel;

  static register = async (req: Request) => {
    const userData = matchedData(req);
    const { email, phoneNumber, password } = userData;

    try {
      const matchQuery = {
        $or: [
          { email },
          { phoneNumber }
        ]
      }
      const emailOrPhoneExists = await AuthService.model.findOne(matchQuery);

      if (emailOrPhoneExists) {
        return formatResponse(httpStatus.BAD_REQUEST, errors.emailOrPhoneAlreadyExists, status.failed);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await AuthService.model.create({ ...userData, password: hashedPassword });
      return formatResponse(httpStatus.CREATED, responses.userRegistrationSuccess, status.success, {
        ...user.toObject(),
        password: hashedPassword,
      });

    } catch (error) {
      console.error({ error });
      return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.internalServerError, status.failed);
    }
  }

  static login = async (req: Request) => {
    const { email, password } = matchedData(req);

    try {
      const matchQuery = { email };
      const user = await AuthService.model.findOne(matchQuery).select(userFieldsToSelectForLogin);
      let passwordOk = false;

      if (!user) {
        return formatResponse(httpStatus.BAD_REQUEST, errors.userNotFound, status.failed);
      }

      if (user.password) {
        passwordOk = await bcrypt.compare(password, user.password);
      }

      if (!passwordOk) {
        return formatResponse(httpStatus.BAD_REQUEST, errors.invalidCredentials, status.failed);
      }

      const jwtService = new JwtService()

      const tokens = jwtService.generate(user.email, user.id)

      return formatResponse(httpStatus.OK, responses.loginSuccess, status.success, { ...user.toObject(), tokens });

    } catch (error) {
      console.error({ error });
      return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.internalServerError, status.failed);
    }
  }

  static refresh = async ({ email, id, refresh }: RefreshPayload) => {

    try {
      const jwtRefreshTime = process.env.JWT_REFRESH_TIME as string;

      await redisService.set({
        key: refresh,
        value: "1",
        timeType: "EX",
        time: jwtRefreshTime,
      });

      const jwtService = new JwtService()

      const tokens = jwtService.generate(email, id);

      if (!tokens) {
        return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.refreshTokenFailed, status.failed);
      }

      return formatResponse(httpStatus.OK, responses.refreshTokenGenerated, status.success, tokens);

    } catch (error) {
      console.error({ error });
      return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.internalServerError, status.failed);
    }
  }

}

export default AuthService;
