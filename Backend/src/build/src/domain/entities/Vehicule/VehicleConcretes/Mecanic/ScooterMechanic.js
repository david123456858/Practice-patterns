"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterMechanical = void 0;
const Scooter_1 = require("../../VehicleGeneric/Scooter");
class ScooterMechanical extends Scooter_1.Scooter {
    constructor(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, hasSeat, mechanicalInfo) {
        super(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, hasSeat);
        this.info = mechanicalInfo;
    }
    // Getters
    getInfo() {
        return this.info;
    }
    // Setters
    setInfo(info) {
        this.info = info;
    }
}
exports.ScooterMechanical = ScooterMechanical;
