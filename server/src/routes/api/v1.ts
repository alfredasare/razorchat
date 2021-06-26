import express from "express";
import authRouter from "../auth/auth.router";
import messageRouter from "../message/message.router";
import conversationRouter from "../conversation/conversation.router";

const api = express.Router();

api.use('/auth', authRouter);
api.use('/messages', messageRouter);
api.use('/conversation', conversationRouter);

export default api;