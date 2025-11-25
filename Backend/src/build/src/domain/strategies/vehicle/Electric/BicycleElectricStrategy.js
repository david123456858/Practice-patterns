"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleElectricEstrategy = void 0;
const BicycleElectricBuilder_1 = require("../../../builders/vehicle/Electric/BicycleElectricBuilder");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class BicycleElectricEstrategy {
    constructor() {
        this.builder = new BicycleElectricBuilder_1.BicycleElectricBuilder();
    }
    contruct(dto) {
        this.builder.setIdVehicle(dto.getIdVehicle());
        this.builder.setColor(dto.getColor());
        this.builder.setModel(dto.getModel());
        this.builder.setStation(dto.getStation());
        this.builder.setState(VehiculeEnum_1.StatusVehicle.AVAILABLE);
        this.builder.setGeoLocation(dto.getLocation());
        this.builder.setMaxUserWeight(dto.getMaxUserWeight());
        this.builder.setVelocityMax(dto.getVelocityMax());
        this.builder.setType(dto.getVehicleType());
        this.builder.setGears(dto.propities.gears);
        this.builder.setHasBasket(dto.propities.hasBasket);
        this.builder.setElectricComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.BicycleElectricEstrategy = BicycleElectricEstrategy;
