"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bicycle = void 0;
const Vehicle_1 = require("./Vehicle");
class Bicycle extends Vehicle_1.Vehicle {
    constructor(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, gears, hasBasket) {
        super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute);
        this.gears = gears;
        this.hasBasket = hasBasket;
    }
    // Getters específicos de Bicycle
    getGears() { return this.gears; }
    getHasBasket() { return this.hasBasket; }
    // Setters específicos de Bicycle
    setGears(gears) { this.gears = gears; }
    setHasBasket(hasBasket) { this.hasBasket = hasBasket; }
}
exports.Bicycle = Bicycle;
