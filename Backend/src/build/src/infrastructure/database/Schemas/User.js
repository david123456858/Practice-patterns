"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelations = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const Loan_1 = require("./Loan");
exports.users = (0, pg_core_1.pgTable)('users', {
    idUser: (0, pg_core_1.varchar)('id_user', { length: 50 }).primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    role: (0, pg_core_1.varchar)('rol').notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull()
});
exports.UserRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    loan: many(Loan_1.loans)
}));
