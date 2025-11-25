"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorySkateboard = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const DirectorVehicle_1 = require("../../../../application/Director/DirectorVehicle");
const Factory_1 = require("../Factory");
class FactorySkateboard extends Factory_1.VehicleFactory {
    createVehicleElectric(vehicle) {
        const director = new DirectorVehicle_1.VehicleDirector();
        return director.construcVehicle(vehicle);
    }
    createVehicleMecacnic(vehicle) {
        const director = new DirectorVehicle_1.VehicleDirector();
        return director.construcVehicle(vehicle);
    }
}
exports.FactorySkateboard = FactorySkateboard;
