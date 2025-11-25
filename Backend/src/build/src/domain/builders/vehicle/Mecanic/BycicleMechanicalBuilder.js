"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleMecanicBuilder = void 0;
const BicycleMechanic_1 = require("../../../entities/Vehicule/VehicleConcretes/Mecanic/BicycleMechanic");
class BicycleMecanicBuilder {
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
    setGears(gears) { this.gears = gears; }
    setHasBasket(hasBasket) { this.hasBasket = hasBasket; }
    setMechanicalComponents(components) { this.mechanicalComponents = components; }
    build() {
        return new BicycleMechanic_1.BicycleMechanic(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.gears, this.hasBasket, this.mechanicalComponents);
    }
}
exports.BicycleMecanicBuilder = BicycleMecanicBuilder;
