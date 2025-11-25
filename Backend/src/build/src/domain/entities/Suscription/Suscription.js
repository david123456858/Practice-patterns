"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuscriptionPlan = void 0;
class SuscriptionPlan {
    constructor(idPlan, name, monthlyFee) {
        this.idPlan = idPlan;
        this.name = name;
        this.monthlyFee = monthlyFee;
    }
    setIdPlan(idPlan) { this.idPlan = idPlan; }
    setName(name) { this.name = name; }
    SetPricing(princig) { this.monthlyFee = princig; }
    getPricing() { return this.monthlyFee; }
    getName() { return this.name; }
    getIdPlan() { return this.idPlan; }
}
exports.SuscriptionPlan = SuscriptionPlan;
