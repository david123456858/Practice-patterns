"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterElectricBuilder = void 0;
const ScooterElectric_1 = require("../../../entities/Vehicule/VehicleConcretes/Electric/ScooterElectric");
class ScooterElectricBuilder {
    setIdVehicle(id) { this.idVehicle = id; }
    setColor(color) { this.color = color; }
    setModel(model) { this.model = model; }
    setStation(station) { this.station = station; }
    setState(state) { this.state = state; }
    setType(type) { this.type = type; }
    setGeoLocation(geoLocation) { this.geoLocation = geoLocation; }
    setMaxUserWeight(weight) { this.maxUserWeight = weight; }
    setVelocityMax(velocity) { this.velocityMax = velocity; }
    setCostForMinute(cost) { this.costForMinute = cost; }
    setHasSeat(hasSeat) { this.hasSeat = hasSeat; }
    setElectricComponents(components) { this.electricComponents = components; }
    build() {
        return new ScooterElectric_1.ScooterElectric(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.hasSeat, this.electricComponents);
    }
}
exports.ScooterElectricBuilder = ScooterElectricBuilder;
