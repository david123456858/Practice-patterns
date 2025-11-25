"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleDirector = void 0;
const BicycleElectricStrategy_1 = require("../../domain/strategies/vehicle/Electric/BicycleElectricStrategy");
const ScooterElectricStrategy_1 = require("../../domain/strategies/vehicle/Electric/ScooterElectricStrategy");
const SkateBoardElectricStrategy_1 = require("../../domain/strategies/vehicle/Electric/SkateBoardElectricStrategy");
const BicycleMechanicStrategy_1 = require("../../domain/strategies/vehicle/Mechanic/BicycleMechanicStrategy");
const ScooterMechanicStrategy_1 = require("../../domain/strategies/vehicle/Mechanic/ScooterMechanicStrategy");
const SkateBoardMechanicStrategy_1 = require("../../domain/strategies/vehicle/Mechanic/SkateBoardMechanicStrategy");
const VehiculeEnum_1 = require("../../domain/types/Vehicule/VehiculeEnum");
class VehicleDirector {
    constructor() {
        this.providerEstrategies = new Map([
            [VehiculeEnum_1.VehicleType.BICYCLE, new BicycleMechanicStrategy_1.BicycleMechanicalEstrategy()],
            [VehiculeEnum_1.VehicleType.ELECTRIC_BICYCLE, new BicycleElectricStrategy_1.BicycleElectricEstrategy()],
            [VehiculeEnum_1.VehicleType.SCOOTER, new ScooterMechanicStrategy_1.ScooterMechanicalEstrategy()],
            [VehiculeEnum_1.VehicleType.ELECTRIC_SCOOTER, new ScooterElectricStrategy_1.ScooterElectricEstrategy()],
            [VehiculeEnum_1.VehicleType.SKATEBOARD, new SkateBoardMechanicStrategy_1.SkateboardMecanicEstrategy()],
            [VehiculeEnum_1.VehicleType.ELECTRIC_SKATEBOARD, new SkateBoardElectricStrategy_1.SkateboardElectricEstrategy()]
        ]);
    }
    construcVehicle(dto) {
        const vehicleEstrategy = this.providerEstrategies.get(dto.getVehicleType());
        return vehicleEstrategy.contruct(dto);
    }
}
exports.VehicleDirector = VehicleDirector;
