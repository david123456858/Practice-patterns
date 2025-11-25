"use strict";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Server_1 = require("./infrastructure/server/Server");
const conection_1 = require("./infrastructure/database/conection");
const repository_1 = require("./infrastructure/repositories/User/repository");
const adminSeeders_1 = require("./infrastructure/seeders/adminSeeders");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "/vault/secrets/config.env" });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conection = yield conection_1.DatabaseConnection.getInstance().verifyConnection();
            if (!conection) {
                throw new Error('No se pudo conectar a la base de datos');
            }
            const repositoy = new repository_1.UserRepository();
            const adminFuntion = new adminSeeders_1.AdminSeeder(repositoy);
            yield adminFuntion.seedAdmin();
            yield conection_1.DatabaseConnection.getInstance().close();
            const server = Server_1.Server.getIntance();
            server.listen();
        }
        catch (error) {
            console.error('Error al iniciar el servidor:', error);
        }
    });
}
main();
