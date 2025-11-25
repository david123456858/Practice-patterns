"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAuth = void 0;
const config_1 = require("../../../infrastructure/config/config");
const auth_1 = require("../../controllers/Auth/auth");
const caseUseAuth_1 = require("../../../application/use-cases/Auth/caseUseAuth");
const repository_1 = require("../../../infrastructure/repositories/User/repository");
const validate_1 = require("../../middlewares/ValidateDto/validate");
const auth_2 = require("../../../domain/dtos/User/auth");
const createDto_1 = require("../../../domain/dtos/User/createDto");
const routeAuth = (prefix) => {
    const repository = new repository_1.UserRepository();
    const service = new caseUseAuth_1.AuthService(repository);
    const controller = new auth_1.AuthController(service);
    config_1.route.post(`${prefix}`, (0, validate_1.validateDto)(auth_2.UserDtoAuth), controller.autenticate);
    config_1.route.post(`${prefix}/register`, (0, validate_1.validateDto)(createDto_1.UserDtoCreate), controller.register);
    return config_1.route;
};
exports.routeAuth = routeAuth;
