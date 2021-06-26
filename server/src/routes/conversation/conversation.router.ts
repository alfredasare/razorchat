import express from "express";
import {httpGetConversation, httpGetUserConversation, httpSendConversation} from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post('/', httpSendConversation);

conversationRouter.get('/:userId', httpGetUserConversation);

conversationRouter.get('/find/:firstUserId/:secondUserId', httpGetConversation);

export default conversationRouter;