import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.dev" });
// DB connection details
const mongodbURI = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`;

//db config
const dbConnection = async () => {
  try {
    await mongoose.connect(mongodbURI),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        bufferCommands: false,
      };
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    throw error;
  }
};

export const redisConfig = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
}

export default dbConnection;
