"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterElectricEstrategy = void 0;
const ScooterElectricBuilder_1 = require("../../../builders/vehicle/Electric/ScooterElectricBuilder");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class ScooterElectricEstrategy {
    constructor() {
        this.builder = new ScooterElectricBuilder_1.ScooterElectricBuilder();
    }
    contruct(dto) {
        this.builder.setIdVehicle(dto.getIdVehicle());
        this.builder.setColor(dto.getColor());
        this.builder.setModel(dto.getModel());
        this.builder.setStation(dto.getStation());
        this.builder.setState(VehiculeEnum_1.StatusVehicle.AVAILABLE);
        this.builder.setGeoLocation(dto.getLocation());
        this.builder.setMaxUserWeight(dto.getMaxUserWeight());
        this.builder.setCostForMinute(dto.getCostForMinute());
        this.builder.setVelocityMax(dto.getVelocityMax());
        this.builder.setType(dto.getVehicleType());
        this.builder.setHasSeat(dto.propities.hasSeat);
        this.builder.setElectricComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.ScooterElectricEstrategy = ScooterElectricEstrategy;
