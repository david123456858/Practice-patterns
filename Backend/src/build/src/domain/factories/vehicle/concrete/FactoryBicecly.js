"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryBicycle = void 0;
const DirectorVehicle_1 = require("../../../../application/Director/DirectorVehicle");
const Factory_1 = require("../Factory");
class FactoryBicycle extends Factory_1.VehicleFactory {
    createVehicleElectric(vehicle) {
        const director = new DirectorVehicle_1.VehicleDirector();
        return director.construcVehicle(vehicle);
    }
    createVehicleMecacnic(vehicle) {
        const director = new DirectorVehicle_1.VehicleDirector();
        return director.construcVehicle(vehicle);
    }
}
exports.FactoryBicycle = FactoryBicycle;
