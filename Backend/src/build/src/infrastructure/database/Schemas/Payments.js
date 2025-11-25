"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationsPayments = exports.payments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Loan_1 = require("./Loan");
const drizzle_orm_1 = require("drizzle-orm");
exports.payments = (0, pg_core_1.pgTable)('payments', {
    paymentId: (0, pg_core_1.varchar)('payment_id', { length: 50 }).primaryKey(),
    loanId: (0, pg_core_1.varchar)('loan_id', { length: 100 }).notNull().references(() => Loan_1.loans.loanId),
    amount: (0, pg_core_1.decimal)('amount', { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)('status').notNull(),
    paymentMethod: (0, pg_core_1.varchar)('payment_method').notNull(),
    paymentDate: (0, pg_core_1.timestamp)('payment_date').notNull()
});
exports.relationsPayments = (0, drizzle_orm_1.relations)(exports.payments, ({ one }) => ({
    loan: one(Loan_1.loans, {
        fields: [exports.payments.loanId],
        references: [Loan_1.loans.loanId]
    })
}));
