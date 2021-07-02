import express from "express";
import messageRouter from "../message/message.router";
import conversationRouter from "../conversation/conversation.router";
import userRouter from "../user/user.router";

const api = express.Router();

api.use('/users', userRouter);
api.use('/messages', messageRouter);
api.use('/conversations', conversationRouter);

export default api;