"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUser = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const Role_1 = require("../../../domain/entities/Role/Role");
const User_1 = require("../../../domain/entities/User/User");
const result_1 = require("../../../presentation/utils/result/result");
class ServiceUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.User('1', 'Admin', 'admin', 'admin@gmail.com', 'admin', Role_1.roleAdmin // rol por defecto
                );
                const findUser = yield this.userRepository.findById(user.getCC());
                if (findUser.length > 0)
                    return (0, result_1.FailureProccess)('admin exist', 404);
                if (!user) {
                    return (0, result_1.FailureProccess)('User not found', 404);
                }
                yield this.userRepository.save(user);
                return (0, result_1.SuccessProcess)('user admin created', 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching user', 500);
            }
        });
    }
    getById(cc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(cc);
                if (!user) {
                    return (0, result_1.FailureProccess)('User not found', 404);
                }
                return (0, result_1.SuccessProcess)(user, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching user', 500);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.findAll();
                return (0, result_1.SuccessProcess)(users, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching users', 500);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, result_1.SuccessProcess)('', 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('', 500);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, result_1.SuccessProcess)('', 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('', 500);
            }
        });
    }
}
exports.ServiceUser = ServiceUser;
