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
exports.routerUser = void 0;
const config_1 = require("../../../infrastructure/config/config");
const ServiceUser_1 = require("../../../application/use-cases/User/ServiceUser");
const repository_1 = require("../../../infrastructure/repositories/User/repository");
const User_1 = require("../../controllers/User/User");
const routerUser = (prefix) => __awaiter(void 0, void 0, void 0, function* () {
    const repositoty = new repository_1.UserRepository();
    const service = new ServiceUser_1.ServiceUser(repositoty);
    const controller = new User_1.UserController(service);
    yield controller.registerAdmin;
    config_1.route.get(`${prefix}`, controller.getUsers);
    config_1.route.get(`${prefix}/:id`, controller.getUsersId);
    return config_1.route;
});
exports.routerUser = routerUser;
