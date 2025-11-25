"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const dotenv_1 = require("dotenv");
const express_1 = require("express");
(0, dotenv_1.config)();
exports.route = (0, express_1.Router)();
exports.default = {
    port: (_a = parseInt(process.env.PORT)) !== null && _a !== void 0 ? _a : 3001,
    routeBase: '/api/v1'
};
