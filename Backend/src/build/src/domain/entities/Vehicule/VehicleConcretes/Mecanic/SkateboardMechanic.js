"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardMechanic = void 0;
const Skateboard_1 = require("../../VehicleGeneric/Skateboard");
class SkateboardMechanic extends Skateboard_1.Skateboard {
    constructor(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, deckSize, mechanicalInfo) {
        super(idVehicle, color, model, station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, deckSize);
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
exports.SkateboardMechanic = SkateboardMechanic;
