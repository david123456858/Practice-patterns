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
exports.PaymentRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const data_1 = require("../../database/data");
const Payments_1 = require("../../database/Schemas/Payments");
class PaymentRepository {
    constructor() {
        this.pool = data_1.DatabaseSql.getInstacne().getDb();
    }
    // 🔹 CREATE
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.insert(Payments_1.payments).values({
                paymentId: data.getPaymentId(),
                loanId: data.getLoanId(),
                amount: data.getAmount().toString(), // decimal -> string
                paymentDate: data.getPaymentDate(),
                paymentMethod: data.getPaymethod(),
                status: data.getStatus()
            });
        });
    }
    // 🔹 DELETE
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.delete(Payments_1.payments).where((0, drizzle_orm_1.eq)(Payments_1.payments.paymentId, id));
        });
    }
    // 🔹 UPDATE
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool
                .update(Payments_1.payments)
                .set({
                loanId: data.getLoanId(),
                amount: data.getAmount().toString(),
                paymentDate: data.getPaymentDate(),
                paymentMethod: data.getPaymethod(),
                status: data.getStatus()
            })
                .where((0, drizzle_orm_1.eq)(Payments_1.payments.paymentId, data.getPaymentId()));
        });
    }
    // 🔹 FIND BY ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool
                .select()
                .from(Payments_1.payments)
                .where((0, drizzle_orm_1.eq)(Payments_1.payments.paymentId, id));
        });
    }
    // 🔹 FIND BY LOAN ID
    findByLoanId(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool
                .select()
                .from(Payments_1.payments)
                .where((0, drizzle_orm_1.eq)(Payments_1.payments.loanId, loanId));
        });
    }
    // 🔹 FIND ALL
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.select().from(Payments_1.payments);
        });
    }
}
exports.PaymentRepository = PaymentRepository;
