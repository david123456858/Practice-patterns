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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config/config"));
const User_1 = require("../../presentation/routes/User/User");
const morgan_1 = __importDefault(require("morgan"));
const Station_1 = require("../../presentation/routes/Station/Station");
const Vehicle_1 = require("../../presentation/routes/Vehicle/Vehicle");
const Loan_1 = require("../../presentation/routes/Loan/Loan");
const auth_1 = require("../../presentation/routes/auth/auth");
const payment_1 = require("../../presentation/routes/payment/payment");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = '3000';
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes().then(() => {
            console.log('rutas listas');
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.disable('x-powered-by');
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.get('/', (_req, res) => {
                res.status(200).json({ message: 'Soy el servicio de vehiculos' });
            });
            this.app.use(config_1.default.routeBase, (0, auth_1.routeAuth)('/auth'));
            this.app.use(config_1.default.routeBase, yield (0, User_1.routerUser)('/user'));
            this.app.use(config_1.default.routeBase, (0, Station_1.routeStation)('/station'));
            this.app.use(config_1.default.routeBase, (0, Vehicle_1.routeVehicle)('/vehicle'));
            this.app.use(config_1.default.routeBase, (0, Loan_1.routeLoan)('/loan'));
            this.app.use(config_1.default.routeBase, (0, payment_1.paymentRoute)('/payment'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        });
    }
    static getIntance() {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }
}
exports.Server = Server;
