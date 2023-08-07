
import { createClient } from "redis";
import { formatResponse } from "../../utils/index.util";
import httpStatus from "http-status";
import { errors } from "../../utils/messages.util";

class RedisService {

  client;

  constructor() {
    this.client = createClient();
  }

  set = async ({ key, value, timeType, time }: any) => {

    try {
      await this.client.connect();
      await this.client.set(key, value, timeType, time);
      await this.client.disconnect();
    } catch (error) {
      console.error({ error });
      return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.internalServerError, false);
    }

  }

  get = async (key: string) => {
    try {
      await this.client.connect();
      const result = await this.client.get(key);
      await this.client.disconnect();
      return result;
    } catch (error) {
      console.error({ error });
      return formatResponse(httpStatus.INTERNAL_SERVER_ERROR, errors.internalServerError, false);
    }

  }
}

export default new RedisService();