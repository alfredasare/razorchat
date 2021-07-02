"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = void 0;
var logger = __importStar(require("../utils/logger"));
var unknownEndpoint = function (_req, res) {
    res.status(404).send({
        error: "unknown endpoint"
    });
};
exports.unknownEndpoint = unknownEndpoint;
var errorHandler = function (error, _req, res, next) {
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    logger.error(error.message);
    next(error);
};
exports.errorHandler = errorHandler;
