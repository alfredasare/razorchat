"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_controller_1 = require("./message.controller");
var messageRouter = express_1.default.Router();
messageRouter.post('/', message_controller_1.httpSendMessage);
messageRouter.get('/:conversationId', message_controller_1.httpGetMessages);
exports.default = messageRouter;
