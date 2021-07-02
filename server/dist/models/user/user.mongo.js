"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var userSchema = new mongoose_1.default.Schema({
    connection: String,
    client_id: String,
    email: String,
    username: String,
    password: String,
    tenant: String,
    transaction: Object,
    request_language: String,
    blockedUsers: {
        type: Array
    }
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.set('toJSON', {
    transform: function (_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
