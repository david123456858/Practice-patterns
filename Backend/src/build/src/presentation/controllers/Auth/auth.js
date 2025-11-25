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
exports.AuthController = void 0;
class AuthController {
    constructor(service) {
        this.serviceAuth = service;
        this.autenticate = this.autenticate.bind(this);
        this.register = this.register.bind(this);
    }
    autenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = req.body;
            const response = yield this.serviceAuth.authenticate(userLogin);
            if (!response.success) {
                res.status(response.status).json({ error: response.error });
                return;
            }
            res.status(response.status).json({ message: response.value });
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const response = yield this.serviceAuth.register(user);
            if (!response.success) {
                res.status(response.status).json({ error: response.error });
                return;
            }
            res.status(response.status).json({ message: response.value });
        });
    }
}
exports.AuthController = AuthController;
