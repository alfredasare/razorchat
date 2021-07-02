"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
require("express-async-errors");
var v1_1 = __importDefault(require("./routes/api/v1"));
var middleware_1 = require("./services/middleware");
var app = express_1.default();
var corsOptions = {
    origin: [
        'http://localhost:3000'
    ],
    credentials: true
};
app.use(cors_1.default(corsOptions));
app.use(helmet_1.default());
app.use(morgan_1.default("combined"));
app.use(express_1.default.json());
app.use('/v1', v1_1.default);
app.use(middleware_1.unknownEndpoint);
app.use(middleware_1.errorHandler);
exports.default = app;
