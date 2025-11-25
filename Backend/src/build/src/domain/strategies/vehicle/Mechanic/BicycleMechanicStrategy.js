"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleMechanicalEstrategy = void 0;
const BycicleMechanicalBuilder_1 = require("../../../builders/vehicle/Mecanic/BycicleMechanicalBuilder");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class BicycleMechanicalEstrategy {
    constructor() {
        this.builder = new BycicleMechanicalBuilder_1.BicycleMecanicBuilder();
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
        this.builder.setGears(dto.propities.gears);
        this.builder.setHasBasket(dto.propities.hasBasket);
        this.builder.setMechanicalComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.BicycleMechanicalEstrategy = BicycleMechanicalEstrategy;
