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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUsers = this.getUsers.bind(this);
        this.getUsersId = this.getUsersId.bind(this);
        this.registerAdmin = this.registerAdmin.bind(this);
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.getAll();
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getUsersId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.userService.getById(id);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    registerAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.userService.createAdmin();
            if (!response.success) {
                res.status(response.status).json({ error: response.error });
                return;
            }
            res.status(response.status).json({ message: response.value });
        });
    }
}
exports.UserController = UserController;
