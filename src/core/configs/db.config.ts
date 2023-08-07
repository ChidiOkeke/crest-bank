import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.dev" });
// DB connection details
const mongodbURI = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`;

// db config
const dbConnection = async () => {
  try {
    await mongoose.connect(mongodbURI),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    throw error;
  }
};

export default dbConnection;
