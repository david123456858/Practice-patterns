"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderVehicle = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const VehiculeEnum_1 = require("../../../domain/types/Vehicule/VehiculeEnum");
const FactoryBicecly_1 = require("../../factories/vehicle/concrete/FactoryBicecly");
const FactoryScooter_1 = require("../../factories/vehicle/concrete/FactoryScooter");
const FactorySkacteboard_1 = require("../../factories/vehicle/concrete/FactorySkacteboard");
class ProviderVehicle {
    constructor() {
        this.providerFactory = new Map();
        this.registerGroup([VehiculeEnum_1.VehicleType.BICYCLE, VehiculeEnum_1.VehicleType.ELECTRIC_BICYCLE], new FactoryBicecly_1.FactoryBicycle());
        this.registerGroup([VehiculeEnum_1.VehicleType.SCOOTER, VehiculeEnum_1.VehicleType.ELECTRIC_SCOOTER], new FactoryScooter_1.FactoryScooter());
        this.registerGroup([VehiculeEnum_1.VehicleType.SKATEBOARD, VehiculeEnum_1.VehicleType.ELECTRIC_SKATEBOARD], new FactorySkacteboard_1.FactorySkateboard());
    }
    registerGroup(keys, baseKey) {
        for (const key of keys) {
            this.providerFactory.set(key, baseKey);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProviderVehicle();
        }
        return this.instance;
    }
    getFactory(type) {
        return this.providerFactory.get(type);
    }
}
exports.ProviderVehicle = ProviderVehicle;
