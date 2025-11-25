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
exports.SkateBoardDtoElectric = exports.ScooterDtoElectric = exports.BicycleDtoElectric = exports.SkateBoardDtoMecanic = exports.ScooterDtoMecanic = exports.BicycleDtoMecanic = exports.ElectricComponents = exports.MechanicalComponents = void 0;
const BrakeTypeEnum_1 = require("./../../types/Vehicule/BrakeTypeEnum");
const class_validator_1 = require("class-validator");
const DriveSystemEnum_1 = require("../../types/Vehicule/DriveSystemEnum");
const classDto_1 = require("./classDto");
const class_transformer_1 = require("class-transformer");
// =========================================
// COMPONENTES MECÁNICOS Y ELÉCTRICOS
// =========================================
class MechanicalComponents {
    // ==== Getters ====
    getDriveSystem() { return this.driveSystem; }
    getType() { return this.Type; }
    getBearingType() { return this.bearingType; }
}
exports.MechanicalComponents = MechanicalComponents;
__decorate([
    (0, class_validator_1.IsEnum)(DriveSystemEnum_1.DriveSystem),
    __metadata("design:type", String)
], MechanicalComponents.prototype, "driveSystem", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(BrakeTypeEnum_1.BrakeType),
    __metadata("design:type", String)
], MechanicalComponents.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MechanicalComponents.prototype, "bearingType", void 0);
class ElectricComponents {
    // ==== Getters ====
    getCapacity() { return this.capacity; }
    getAutonomyRange() { return this.autonomyRange; }
}
exports.ElectricComponents = ElectricComponents;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ElectricComponents.prototype, "capacity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ElectricComponents.prototype, "autonomyRange", void 0);
// =========================================
// VEHÍCULOS MECÁNICOS
// =========================================
class BicycleDtoMecanic extends classDto_1.BicycleDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.BicycleDtoMecanic = BicycleDtoMecanic;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MechanicalComponents),
    __metadata("design:type", MechanicalComponents
    // ==== Getters ====
    )
], BicycleDtoMecanic.prototype, "info", void 0);
class ScooterDtoMecanic extends classDto_1.ScooterDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.ScooterDtoMecanic = ScooterDtoMecanic;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MechanicalComponents),
    __metadata("design:type", MechanicalComponents
    // ==== Getters ====
    )
], ScooterDtoMecanic.prototype, "info", void 0);
class SkateBoardDtoMecanic extends classDto_1.SkateboardDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.SkateBoardDtoMecanic = SkateBoardDtoMecanic;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MechanicalComponents),
    __metadata("design:type", MechanicalComponents
    // ==== Getters ====
    )
], SkateBoardDtoMecanic.prototype, "info", void 0);
// =========================================
// VEHÍCULOS ELÉCTRICOS
// =========================================
class BicycleDtoElectric extends classDto_1.BicycleDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.BicycleDtoElectric = BicycleDtoElectric;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ElectricComponents),
    __metadata("design:type", ElectricComponents
    // ==== Getters ====
    )
], BicycleDtoElectric.prototype, "info", void 0);
class ScooterDtoElectric extends classDto_1.ScooterDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.ScooterDtoElectric = ScooterDtoElectric;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ElectricComponents),
    __metadata("design:type", ElectricComponents
    // ==== Getters ====
    )
], ScooterDtoElectric.prototype, "info", void 0);
class SkateBoardDtoElectric extends classDto_1.SkateboardDto {
    // ==== Getters ====
    getInfo() { return this.info; }
}
exports.SkateBoardDtoElectric = SkateBoardDtoElectric;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ElectricComponents),
    __metadata("design:type", ElectricComponents
    // ==== Getters ====
    )
], SkateBoardDtoElectric.prototype, "info", void 0);
