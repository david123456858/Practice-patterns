"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderTypeVehicle = void 0;
const VehiculeEnum_1 = require("../../types/Vehicule/VehiculeEnum");
const concreteDto_1 = require("./concreteDto");
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
class ProviderTypeVehicle {
    constructor() {
        this.ProviderTypeVehicle = new Map([
            [VehiculeEnum_1.VehicleType.BICYCLE, concreteDto_1.BicycleDtoMecanic],
            [VehiculeEnum_1.VehicleType.ELECTRIC_BICYCLE, concreteDto_1.BicycleDtoElectric],
            [VehiculeEnum_1.VehicleType.SCOOTER, concreteDto_1.ScooterDtoMecanic],
            [VehiculeEnum_1.VehicleType.ELECTRIC_SCOOTER, concreteDto_1.ScooterDtoElectric],
            [VehiculeEnum_1.VehicleType.SKATEBOARD, concreteDto_1.SkateBoardDtoMecanic],
            [VehiculeEnum_1.VehicleType.ELECTRIC_SKATEBOARD, concreteDto_1.SkateBoardDtoElectric]
        ]);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProviderTypeVehicle();
        }
        return this.instance;
    }
    getVehicleClass(id) {
        const providerd = this.ProviderTypeVehicle.get(id);
        if (!providerd) {
            console.warn(`Provider ${id} not found, returning base VMDTO`);
        }
        return providerd;
    }
}
exports.ProviderTypeVehicle = ProviderTypeVehicle;
