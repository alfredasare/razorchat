import express from "express";
import {httpGetMessages, httpSendMessage} from "./message.controller";

const messageRouter = express.Router();

messageRouter.post('/', httpSendMessage);

messageRouter.get('/:conversationId', httpGetMessages);

export default messageRouter;