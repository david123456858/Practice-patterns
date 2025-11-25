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
exports.VehicleController = void 0;
const VehiculeEnum_1 = require("../../../domain/types/Vehicule/VehiculeEnum");
const DriveSystemEnum_1 = require("../../../domain/types/Vehicule/DriveSystemEnum");
const BrakeTypeEnum_1 = require("../../../domain/types/Vehicule/BrakeTypeEnum");
class VehicleController {
    constructor(Service) {
        this.Service = Service;
        this.create = this.create.bind(this);
        this.getVehicle = this.getVehicle.bind(this);
        this.getVehicleById = this.getVehicleById.bind(this);
        this.getVehicleAvaibleByStation = this.getVehicleAvaibleByStation.bind(this);
        this.getVehicleAvaible = this.getVehicleAvaible.bind(this);
        this.getTypesMechanical = this.getTypesMechanical.bind(this);
    }
    create(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const result = yield this.Service.create(body);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getVehicle(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.Service.getAll();
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getVehicleById(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.Service.getById(id);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getVehicleTypes(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = VehiculeEnum_1.VehicleType;
            res.status(200).json({ message: result });
        });
    }
    getTypesMechanical(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                drive: DriveSystemEnum_1.DriveSystem,
                bearing: DriveSystemEnum_1.bearingType,
                brake: BrakeTypeEnum_1.BrakeType
            });
        });
    }
    getVehicleAvaibleByStation(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.Service.getAvailableByStation(id);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getVehicleAvaible(req, res, Next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.Service.getAvailable();
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
}
exports.VehicleController = VehicleController;
