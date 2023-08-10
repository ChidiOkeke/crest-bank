import { Request } from "express";
import { generateAccountNumber } from "../../utils/index.util";
import { accountNumberMax, accountNumberMin, maxRetries, userFieldsToSelectForLogin } from "../../constants/constants";
import { UserModelType } from "../../schemas/user.schema";
import { matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import { errors, responses } from "../../utils/messages.util";
import JwtService from "../../utils/jwt.util";
import redisService from "../redis/redis.service";
import { RefreshPayload } from "../../types/index.types";
import { inject, injectable } from "tsyringe";
import FormatResponse from "../../utils/responses.util";

@injectable()
class AuthService {

  constructor(@inject('UserModel') private userModel: UserModelType) {
    this.userModel = userModel;
  }

  register = async (req: Request) => {
    const userData = matchedData(req);
    const { email, phoneNumber, password } = userData;

    try {
      const matchQuery = {
        $or: [
          { email },
          { phoneNumber }
        ]
      }
      const emailOrPhoneExists = await this.userModel.findOne(matchQuery);

      if (emailOrPhoneExists) {
        return FormatResponse.badRequest(errors.emailOrPhoneAlreadyExists)
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.userModel.create({ ...userData, password: hashedPassword });

      return FormatResponse.created(responses.userRegistrationSuccess, {
        ...user.toObject(),
        password: null,
      })

    } catch (error) {
      console.error({ error });
      return FormatResponse.internalServerError()
    }
  }

  login = async (req: Request) => {
    const { email, password } = matchedData(req);

    try {
      const matchQuery = { email };
      const user = await this.userModel.findOne(matchQuery).select(userFieldsToSelectForLogin);
      let passwordOk = false;

      if (!user) {
        return FormatResponse.notFound(errors.userNotFound)
      }

      if (user.password) {
        passwordOk = await bcrypt.compare(password, user.password);
      }

      if (!passwordOk) {
        return FormatResponse.badRequest(errors.invalidCredentials)
      }

      const jwtService = new JwtService()

      const tokens = jwtService.generate(user.email, user.id)

      return FormatResponse.ok(responses.loginSuccess, { ...user.toObject(), password: null, tokens })

    } catch (error) {
      console.error({ error });
      return FormatResponse.internalServerError()
    }
  }

  refresh = async ({ email, id, refresh }: RefreshPayload) => {

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
        return FormatResponse.internalServerError(errors.refreshTokenFailed)
      }

      return FormatResponse.ok(responses.refreshTokenGenerated, tokens)

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
        existingAccountNumber = await this.userModel.findOne({ accountNumber: generatedAccountNumber })
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

  resolveUserRoles = async (userId: string) => {
    try {
      const user = await this.userModel.findById(userId)
      if (!user) {
        return false;
      }
      const { role } = user

      return role;
    } catch (error) {
      console.error({ error });
      return false
    }
  }
}

export default AuthService;
