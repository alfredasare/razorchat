"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_router_1 = __importDefault(require("../message/message.router"));
var conversation_router_1 = __importDefault(require("../conversation/conversation.router"));
var user_router_1 = __importDefault(require("../user/user.router"));
var api = express_1.default.Router();
api.use('/users', user_router_1.default);
api.use('/messages', message_router_1.default);
api.use('/conversations', conversation_router_1.default);
exports.default = api;
