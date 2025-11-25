"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardElectricBuilder = void 0;
const SkateBoardElectric_1 = require("../../../entities/Vehicule/VehicleConcretes/Electric/SkateBoardElectric");
class SkateboardElectricBuilder {
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
    setDeckSize(deckSize) { this.deckSize = deckSize; }
    setElectricComponents(components) { this.electricComponents = components; }
    build() {
        return new SkateBoardElectric_1.SkateboardElectric(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.deckSize, this.electricComponents);
    }
}
exports.SkateboardElectricBuilder = SkateboardElectricBuilder;
