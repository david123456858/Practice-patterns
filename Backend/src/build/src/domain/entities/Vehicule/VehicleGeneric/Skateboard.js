"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skateboard = void 0;
const Vehicle_1 = require("./Vehicle");
class Skateboard extends Vehicle_1.Vehicle {
    constructor(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute, deckSize) {
        super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute);
        this.deckSize = deckSize;
    }
    setDeckSize(size) { this.deckSize = size; }
    getDeckSize() { return this.deckSize; }
}
exports.Skateboard = Skateboard;
