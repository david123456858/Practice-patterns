"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicalComponents = void 0;
class MechanicalComponents {
    constructor(driveSystem, brakeType, bearingType) {
        this.driveSystem = driveSystem;
        this.brakeType = brakeType;
        this.bearingType = bearingType;
    }
    // Getters
    getDriveSystem() {
        return this.driveSystem;
    }
    getBrakeType() {
        return this.brakeType;
    }
    getBearingType() {
        return this.bearingType;
    }
    // Setters
    setDriveSystem(driveSystem) {
        this.driveSystem = driveSystem;
    }
    setBrakeType(brakeType) {
        this.brakeType = brakeType;
    }
    setBearingType(bearingType) {
        this.bearingType = bearingType;
    }
}
exports.MechanicalComponents = MechanicalComponents;
