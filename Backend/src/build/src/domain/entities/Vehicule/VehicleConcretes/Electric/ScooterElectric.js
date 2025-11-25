"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterElectric = void 0;
const Scooter_1 = require("../../VehicleGeneric/Scooter");
class ScooterElectric extends Scooter_1.Scooter {
    constructor(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, hasSeat, mechanicalInfo) {
        super(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, hasSeat);
        this.info = mechanicalInfo;
    }
    getInfo() {
        return this.info;
    }
    // Setters
    setInfo(info) {
        this.info = info;
    }
}
exports.ScooterElectric = ScooterElectric;
