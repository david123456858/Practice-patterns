"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarElectric = void 0;
const Vehicle_1 = require("./Vehicle");
class CarElectric extends Vehicle_1.Vehicle {
    constructor(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, doors, batteryInfo, hasAirConditioning) {
        super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute);
        this.doors = doors;
        this.batteryInfo = batteryInfo;
        this.hasAirConditioning = hasAirConditioning;
    }
    // Getters específicos de CarElectric
    getDoors() { return this.doors; }
    getBatteryInfo() { return this.batteryInfo; }
    getHasAirConditioning() { return this.hasAirConditioning; }
    // Setters específicos de CarElectric
    setDoors(doors) { this.doors = doors; }
    setBatteryInfo(battery) { this.batteryInfo = battery; }
    setHasAirConditioning(has) { this.hasAirConditioning = has; }
}
exports.CarElectric = CarElectric;
