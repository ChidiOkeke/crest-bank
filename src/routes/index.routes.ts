import express from "express";
import authRoutes from "./auth.routes"

const app = express();

app.use("/api/v1/auth", authRoutes);

export default app;
