import express, { Request, Response } from "express";
import authRoutes from "./auth.routes"
import transactionRoutes from './transactions.routes'
import accountRoutes from "./account.routes"
import { rateLimiter } from "../middlewares/rateLimiter.middleware";
import httpStatus from "http-status";
import { errors } from "../utils/messages.util";

const app = express();

app.use(rateLimiter)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/accounts", accountRoutes);


// Catch-all route
app.use("*", (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json(errors.notFound);
});

export default app;
