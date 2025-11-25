"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardElectricEstrategy = void 0;
const SkateBoardElectric_1 = require("../../../builders/vehicle/Electric/SkateBoardElectric");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class SkateboardElectricEstrategy {
    constructor() {
        this.builder = new SkateBoardElectric_1.SkateboardElectricBuilder();
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
        this.builder.setDeckSize(dto.propities.deckSize);
        this.builder.setElectricComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.SkateboardElectricEstrategy = SkateboardElectricEstrategy;
