"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectricComponents = void 0;
class ElectricComponents {
    constructor(capacity, autonomyRange) {
        this.capacity = capacity;
        this.autonomyRange = autonomyRange;
    }
    // Getters
    getCapacity() { return this.capacity; }
    getAutonomyRange() { return this.autonomyRange; }
    // Setters
    setCapacity(capacity) { this.capacity = capacity; }
    setAutonomyRange(range) { this.autonomyRange = range; }
}
exports.ElectricComponents = ElectricComponents;
