"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = exports.StatusVehicle = void 0;
var StatusVehicle;
(function (StatusVehicle) {
    StatusVehicle["AVAILABLE"] = "AVAILABLE";
    StatusVehicle["IN_USE"] = "IN_USE";
    StatusVehicle["OUT_OF_SERVICE"] = "OUT-OF-SERVICE";
    StatusVehicle["MAINTENANCE"] = "MAINTENANCE";
})(StatusVehicle || (exports.StatusVehicle = StatusVehicle = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["BICYCLE"] = "bicycle";
    VehicleType["SCOOTER"] = "scooter";
    VehicleType["SKATEBOARD"] = "skateboard";
    VehicleType["ELECTRIC_SCOOTER"] = "electric_scooter";
    VehicleType["ELECTRIC_BICYCLE"] = "electric_bicycle";
    VehicleType["ELECTRIC_SKATEBOARD"] = "electric_skateboard";
    VehicleType["CAR_ELECTRIC"] = "car_electric";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
