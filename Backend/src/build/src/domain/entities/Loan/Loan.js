"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
const LoanEnum_1 = require("../../types/Loan/LoanEnum");
class Loan {
    constructor(loanId, userId, vehicleId, startStationId, startTime, status = LoanEnum_1.LoanStatus.ACTIVE) {
        this.loanId = loanId;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.startTime = startTime;
        this.endTime = new Date();
        this.startStationId = startStationId;
        this.endStationId = null;
        this.status = status;
        this.cost = 0;
    }
    // Getters
    getLoanId() {
        return this.loanId;
    }
    getUserId() {
        return this.userId;
    }
    getVehicleId() {
        return this.vehicleId;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getStartStationId() {
        return this.startStationId;
    }
    getEndStationId() {
        return this.endStationId;
    }
    getStatus() {
        return this.status;
    }
    getCost() {
        return this.cost;
    }
    // Setters
    setEndTime(endTime) {
        this.endTime = endTime;
    }
    setEndStationId(stationId) {
        this.endStationId = stationId;
    }
    setStatus(status) {
        this.status = status;
    }
    setCost(cost) {
        this.cost = cost;
    }
}
exports.Loan = Loan;
