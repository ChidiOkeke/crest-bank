import express from "express";
import authRoutes from "./auth.routes"
import transactionRoutes from "./transactions.routes"
const app = express();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);

export default app;
