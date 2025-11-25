"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleFactory = void 0;
class VehicleFactory {
    createVehicle(vehicle, isElectric) {
        return isElectric ? this.createVehicleElectric(vehicle) : this.createVehicleMecacnic(vehicle);
    }
}
exports.VehicleFactory = VehicleFactory;
