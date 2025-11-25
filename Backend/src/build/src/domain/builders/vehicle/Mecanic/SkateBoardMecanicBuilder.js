"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardMecanicBuilder = void 0;
const SkateboardMechanic_1 = require("../../../entities/Vehicule/VehicleConcretes/Mecanic/SkateboardMechanic");
class SkateboardMecanicBuilder {
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
    setDeskSize(deckSize) { this.deckSize = deckSize; }
    setMechanicalComponents(components) { this.mechanicalComponents = components; }
    build() {
        return new SkateboardMechanic_1.SkateboardMechanic(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.deckSize, this.mechanicalComponents);
    }
}
exports.SkateboardMecanicBuilder = SkateboardMecanicBuilder;
