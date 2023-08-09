import express from "express";
import authRoutes from "./auth.routes"
import transactionRoutes from './transactions.routes'
import accountRoutes from "./account.routes"
import { rateLimiter } from "../middlewares/rateLimiter.middleware";

const app = express();

app.use(rateLimiter)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/accounts", accountRoutes);

export default app;
