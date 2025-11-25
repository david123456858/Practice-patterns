"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleElectricBuilder = void 0;
const BicycleElectric_1 = require("../../../entities/Vehicule/VehicleConcretes/Electric/BicycleElectric");
class BicycleElectricBuilder {
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
    setElectricComponents(components) { this.electricComponents = components; }
    build() {
        return new BicycleElectric_1.BicycleElectric(this.idVehicle, this.color, this.model, this.station, this.state, this.type, this.geoLocation, this.maxUserWeight, this.velocityMax, this.costForMinute, this.gears, this.hasBasket, this.electricComponents);
    }
}
exports.BicycleElectricBuilder = BicycleElectricBuilder;
