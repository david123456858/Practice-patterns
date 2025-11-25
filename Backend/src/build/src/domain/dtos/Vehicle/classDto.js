"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateboardDto = exports.ScooterDto = exports.BicycleDto = exports.BaseVehicleDto = exports.GeoLocationDto = void 0;
const class_validator_1 = require("class-validator");
const VehiculeEnum_1 = require("../../types/Vehicule/VehiculeEnum");
const class_transformer_1 = require("class-transformer");
// =========================================
// DTO base para vehículos
// =========================================
class GeoLocationDto {
    getLatitude() { return this.latitude; }
    getLongitude() { return this.longitude; }
    getTimestamp() { return this.timestamp; }
}
exports.GeoLocationDto = GeoLocationDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GeoLocationDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GeoLocationDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GeoLocationDto.prototype, "timestamp", void 0);
class StationDto {
    getIdStation() { return this.idStation; }
    getName() { return this.name; }
    getAddress() { return this.address; }
    getGeoLocation() { return this.geoLocation; }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StationDto.prototype, "idStation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StationDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GeoLocationDto),
    __metadata("design:type", GeoLocationDto)
], StationDto.prototype, "geoLocation", void 0);
class BaseVehicleDto {
    // ==== Getters ====
    getIdVehicle() { return this.idVehicle; }
    getVehicleType() { return this.vehicleType; }
    getColor() { return this.color; }
    getModel() { return this.model; }
    getStation() { return this.station; }
    getLocation() { return this.geolocation; }
    getMaxUserWeight() { return this.maxUserWeight; }
    getVelocityMax() { return this.velocityMax; }
    getCostForMinute() { return this.costForMinute; }
}
exports.BaseVehicleDto = BaseVehicleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseVehicleDto.prototype, "idVehicle", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(VehiculeEnum_1.VehicleType),
    __metadata("design:type", String)
], BaseVehicleDto.prototype, "vehicleType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseVehicleDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseVehicleDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => StationDto),
    __metadata("design:type", StationDto)
], BaseVehicleDto.prototype, "station", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GeoLocationDto),
    __metadata("design:type", GeoLocationDto)
], BaseVehicleDto.prototype, "geolocation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseVehicleDto.prototype, "maxUserWeight", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseVehicleDto.prototype, "velocityMax", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseVehicleDto.prototype, "costForMinute", void 0);
// =========================================
// DTO para crear bicicleta
// =========================================
class BicycleDto {
    // ==== Getters ====
    getGears() { return this.gears; }
    getHasBasket() { return this.hasBasket; }
}
exports.BicycleDto = BicycleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BicycleDto.prototype, "gears", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BicycleDto.prototype, "hasBasket", void 0);
// =========================================
// DTO para crear scooter
// =========================================
class ScooterDto {
    // ==== Getters ====
    getHasSeat() { return this.hasSeat; }
}
exports.ScooterDto = ScooterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScooterDto.prototype, "hasSeat", void 0);
// =========================================
// DTO para crear skateboard
// =========================================
class SkateboardDto {
    // ==== Getters ====
    getDeckSize() { return this.deckSize; }
}
exports.SkateboardDto = SkateboardDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SkateboardDto.prototype, "deckSize", void 0);
