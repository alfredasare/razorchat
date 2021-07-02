"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("./user.controller");
var userRouter = express_1.default.Router();
userRouter.post('/email', user_controller_1.httpGetUserByEmail);
userRouter.get('/all', user_controller_1.httpGetAllUsers);
userRouter.get('/:id', user_controller_1.httpGetUserById);
exports.default = userRouter;
