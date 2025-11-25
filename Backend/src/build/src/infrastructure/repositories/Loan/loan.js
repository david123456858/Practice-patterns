"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositotyLoan = void 0;
const data_1 = require("../../database/data");
const Loan_1 = require("../../database/Schemas/Loan");
const drizzle_orm_1 = require("drizzle-orm");
class RepositotyLoan {
    constructor() {
        this.pool = data_1.DatabaseSql.getInstacne().getDb();
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.insert(Loan_1.loans).values({
                loanId: data.getLoanId(),
                userId: data.getUserId(),
                vehicleId: data.getVehicleId(),
                startTime: data.getStartTime(),
                endTime: data.getEndTime(),
                startStationId: data.getStartStationId(),
                status: data.getStatus(),
                endStationId: data.getEndStationId(),
                cost: data.getCost().toString()
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool
                .delete(Loan_1.loans)
                .where((0, drizzle_orm_1.eq)(Loan_1.loans.loanId, id));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool
                .update(Loan_1.loans)
                .set({
                userId: data.userId,
                vehicleId: data.vehicleId,
                startTime: data.startTime,
                endTime: data.endTime,
                startStationId: data.startStationId,
                endStationId: data.gendStationId,
                status: data.status,
                cost: data.cost
            })
                .where((0, drizzle_orm_1.eq)(Loan_1.loans.loanId, data.loanId));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool
                .select()
                .from(Loan_1.loans)
                .where((0, drizzle_orm_1.eq)(Loan_1.loans.loanId, id));
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.select().from(Loan_1.loans);
            return result;
        });
    }
}
exports.RepositotyLoan = RepositotyLoan;
