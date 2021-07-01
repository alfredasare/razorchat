import express from "express";
import {
    httpBlockUser,
    httpGetConversation,
    httpGetUserConversation,
    httpSendConversation
} from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post('/', httpSendConversation);

conversationRouter.get('/:userId', httpGetUserConversation);

conversationRouter.get('/find/:firstUserId/:secondUserId', httpGetConversation);

conversationRouter.post('/block', httpBlockUser);

export default conversationRouter;