import express from "express";
import authRouter from "../auth/auth.router";

const api = express.Router();

api.use('/auth', authRouter);

export default api;