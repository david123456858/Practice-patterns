"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleMechanic = void 0;
const Bicycle_1 = require("../../VehicleGeneric/Bicycle");
class BicycleMechanic extends Bicycle_1.Bicycle {
    constructor(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, gears, hasBasket, mechanicalInfo) {
        super(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, gears, hasBasket);
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
exports.BicycleMechanic = BicycleMechanic;
