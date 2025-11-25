"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardMecanicEstrategy = void 0;
const SkateBoardMecanicBuilder_1 = require("../../../builders/vehicle/Mecanic/SkateBoardMecanicBuilder");
const VehiculeEnum_1 = require("../../../types/Vehicule/VehiculeEnum");
class SkateboardMecanicEstrategy {
    constructor() {
        this.builder = new SkateBoardMecanicBuilder_1.SkateboardMecanicBuilder();
    }
    contruct(dto) {
        this.builder.setIdVehicle(dto.getIdVehicle());
        this.builder.setColor(dto.getColor());
        this.builder.setModel(dto.getModel());
        this.builder.setStation(dto.getStation());
        this.builder.setState(VehiculeEnum_1.StatusVehicle.AVAILABLE);
        this.builder.setGeoLocation(dto.getLocation());
        this.builder.setMaxUserWeight(dto.getMaxUserWeight());
        this.builder.setVelocityMax(dto.getCostForMinute());
        this.builder.setCostForMinute(dto.getCostForMinute());
        this.builder.setType(dto.getVehicleType());
        this.builder.setDeskSize(dto.propities.deckSize);
        this.builder.setMechanicalComponents(dto.propities.info);
        return this.builder.build();
    }
}
exports.SkateboardMecanicEstrategy = SkateboardMecanicEstrategy;
