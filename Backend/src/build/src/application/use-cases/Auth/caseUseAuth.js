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
exports.AuthService = void 0;
const Role_1 = require("../../../domain/entities/Role/Role");
const User_1 = require("../../../domain/entities/User/User");
const result_1 = require("../../../presentation/utils/result/result");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // 🔹 LOGIN / AUTHENTICATE
    authenticate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar usuario por correo
                const userResult = yield this.userRepository.findByEmail(data.email);
                const user = Array.isArray(userResult) ? userResult[0] : userResult;
                if (!user)
                    return (0, result_1.FailureProccess)('User not found', 404);
                // Validar contraseña (en texto plano por ahora)
                if (user.password !== data.password) {
                    return (0, result_1.FailureProccess)('Invalid credentials', 401);
                }
                // Armar respuesta DTO
                const userDtoResponse = {
                    userEmail: user.email,
                    userId: user.idUser,
                    userName: user.name,
                    role: user.role
                };
                return (0, result_1.SuccessProcess)(userDtoResponse, 200);
            }
            catch (error) {
                console.error('Auth Error:', error);
                return (0, result_1.FailureProccess)('Internal server error', 500);
            }
        });
    }
    // 🔹 REGISTER / SIGNUP
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userRepository.findByEmail(data.email);
                const userFound = Array.isArray(existingUser) && existingUser.length > 0 ? existingUser[0] : null;
                if (userFound) {
                    return (0, result_1.FailureProccess)('User already exists', 400);
                }
                // Crear entidad de dominio User
                const newUser = new User_1.User(data.idUser, data.name, data.lastName, data.email, data.password, Role_1.roleClient // rol por defecto
                );
                yield this.userRepository.save(newUser);
                return (0, result_1.SuccessProcess)('User created successfully', 201);
            }
            catch (error) {
                console.error('Register Error:', error);
                return (0, result_1.FailureProccess)('Internal server error', 500);
            }
        });
    }
}
exports.AuthService = AuthService;
