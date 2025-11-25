"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    constructor(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute) {
        this.idVehicle = idVehicle;
        this.color = color;
        this.model = model;
        this.Station = Station;
        this.state = state;
        this.type = type;
        this.geoLocation = geoLocation;
        this.maxUserWeight = maxUserWeight;
        this.velocityMax = velocityMax;
        this.costForMinute = costForMinute;
    }
    // Getters
    getIdVehicle() { return this.idVehicle; }
    getColor() { return this.color; }
    getModel() { return this.model; }
    getIdStation() { return this.Station; }
    getState() { return this.state; }
    getGeoLocation() { return this.geoLocation; }
    getMaxUserWeight() { return this.maxUserWeight; }
    getVelocityMax() { return this.velocityMax; }
    getCostForMinute() { return this.costForMinute; }
    getType() { return this.type; }
    // Setters
    setColor(color) { this.color = color; }
    setModel(model) { this.model = model; }
    setIdStation(idStation) { this.Station = idStation; }
    setState(state) { this.state = state; }
    setGeoLocation(geoLocation) { this.geoLocation = geoLocation; }
    setMaxUserWeight(weight) { this.maxUserWeight = weight; }
    setVelocityMax(velocity) { this.velocityMax = velocity; }
    setCostForMinute(cost) { this.costForMinute = cost; }
}
exports.Vehicle = Vehicle;
