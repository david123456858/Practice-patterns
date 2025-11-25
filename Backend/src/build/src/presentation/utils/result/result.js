"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessProcess = exports.FailureProccess = void 0;
const FailureProccess = (error, status) => ({
    error,
    success: false,
    status
});
exports.FailureProccess = FailureProccess;
const SuccessProcess = (value, status) => ({
    value,
    success: true,
    status
});
exports.SuccessProcess = SuccessProcess;
