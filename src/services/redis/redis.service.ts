
import { createClient } from "redis";
import FormatResponse from "../../utils/responses.util";
import { redisConfig } from "../../core/configs/db.config";

class RedisService {

  client;

  constructor() {
    this.client = createClient(redisConfig);
  }

  set = async ({ key, value, timeType, time }: any) => {

    try {
      await this.client.connect();
      await this.client.set(key, value, timeType, time);
      await this.client.disconnect();
    } catch (error) {
      console.error({ error });
      FormatResponse.internalServerError()
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
      FormatResponse.internalServerError()
    }

  }
}

export default new RedisService();