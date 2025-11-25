"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scooter = void 0;
const Vehicle_1 = require("./Vehicle");
class Scooter extends Vehicle_1.Vehicle {
    constructor(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, hasSeat) {
        super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute);
        this.hasSeat = hasSeat;
    }
    // Getters específicos de ElectricScooter
    getHasSeat() { return this.hasSeat; }
    // Setters específicos de ElectricScooter
    setHasSeat(hasSeat) { this.hasSeat = hasSeat; }
}
exports.Scooter = Scooter;
