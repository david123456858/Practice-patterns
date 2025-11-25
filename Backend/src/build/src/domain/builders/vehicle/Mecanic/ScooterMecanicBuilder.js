"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScooterMechanicalBuilder = void 0;
const ScooterMechanic_1 = require("../../../entities/Vehicule/VehicleConcretes/Mecanic/ScooterMechanic");
class ScooterMechanicalBuilder {
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
    setMechanicalComponents(components) { this.mechanicalComponents = components; }
    build() {
        return new ScooterMechanic_1.ScooterMechanical(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.hasSeat, this.mechanicalComponents);
    }
}
exports.ScooterMechanicalBuilder = ScooterMechanicalBuilder;
