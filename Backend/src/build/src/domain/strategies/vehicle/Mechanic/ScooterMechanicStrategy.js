"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterMechanicalEstrategy = void 0;
const ScooterMecanicBuilder_1 = require("../../../builders/vehicle/Mecanic/ScooterMecanicBuilder");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class ScooterMechanicalEstrategy {
    constructor() {
        this.builder = new ScooterMecanicBuilder_1.ScooterMechanicalBuilder();
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
        this.builder.setCostForMinute(dto.getCostForMinute());
        this.builder.setType(dto.getVehicleType());
        this.builder.setHasSeat(dto.propities.hasSeat);
        this.builder.setMechanicalComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.ScooterMechanicalEstrategy = ScooterMechanicalEstrategy;
