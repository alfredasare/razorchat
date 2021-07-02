"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var conversation_controller_1 = require("./conversation.controller");
var conversationRouter = express_1.default.Router();
conversationRouter.post('/', conversation_controller_1.httpSendConversation);
conversationRouter.get('/:userId', conversation_controller_1.httpGetUserConversation);
conversationRouter.get('/find/:firstUserId/:secondUserId', conversation_controller_1.httpGetConversation);
conversationRouter.post('/block', conversation_controller_1.httpBlockUser);
exports.default = conversationRouter;
