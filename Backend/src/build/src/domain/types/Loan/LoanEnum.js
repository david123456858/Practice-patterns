"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolType = exports.LoanStatus = void 0;
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["ACTIVE"] = "ACTIVE";
    LoanStatus["COMPLETED"] = "COMPLETED";
    LoanStatus["CANCELLED"] = "CANCELLED";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var RolType;
(function (RolType) {
    RolType["ADMIN"] = "admin";
    RolType["CLIENT"] = "client";
})(RolType || (exports.RolType = RolType = {}));
