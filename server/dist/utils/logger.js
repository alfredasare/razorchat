"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = void 0;
var info = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.log.apply(console, params);
};
exports.info = info;
var error = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.error.apply(console, params);
};
exports.error = error;
