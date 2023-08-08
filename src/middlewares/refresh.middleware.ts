import jwt from "jsonwebtoken";
import { ServerError } from "../utils/serverError.util.js";
import redisService from "../services/redis/redis.service.js";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { errors } from "../utils/messages.util.js";
import { JwtDecodedOptions } from "../types/index.types.js";
import { formatResponse } from "../utils/index.util.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.refresh) {
    const { statusCode, body } = formatResponse(
      httpStatus.BAD_REQUEST,
      errors.refreshTokenNotPresent,
      false
    );
    return res.status(statusCode).json(body);
  }
  const token = req.body.refresh;
  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as JwtDecodedOptions;

    if (
      decoded.type !== process.env.JWT_REFRESH ||
      decoded.aud !== process.env.JWT_AUDIENCE ||
      decoded.iss !== process.env.JWT_ISSUER
    ) {
      const { statusCode, body } = formatResponse(
        httpStatus.UNAUTHORIZED,
        errors.invalidTokenType,
        false
      );
      return res.status(statusCode).json(body);
    }

    const value = await redisService.get(token);

    if (value) {
      const { statusCode, body } = formatResponse(
        httpStatus.UNAUTHORIZED,
        errors.refreshTokenUsed,
        false
      );
      return res.status(statusCode).json(body);
    }

    next();
  } catch (error) {
    console.error(error);
    const { statusCode, body } = formatResponse(
      httpStatus.UNAUTHORIZED,
      errors.invalidJwtToken,
      false
    );
    return res.status(statusCode).json(body);
  }
};
