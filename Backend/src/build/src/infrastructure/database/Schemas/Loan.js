"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationsLoan = exports.loans = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const User_1 = require("./User");
const Station_1 = require("./Station");
const drizzle_orm_1 = require("drizzle-orm");
const Vehicle_1 = require("./Vehicle");
const Payments_1 = require("./Payments");
exports.loans = (0, pg_core_1.pgTable)('loans', {
    loanId: (0, pg_core_1.varchar)('loan_id', { length: 50 }).primaryKey(),
    userId: (0, pg_core_1.varchar)('user_id', { length: 50 }).notNull().references(() => User_1.users.idUser),
    vehicleId: (0, pg_core_1.varchar)('vehicle_id', { length: 50 }).notNull().references(() => Vehicle_1.vehicles.idVehicle),
    startTime: (0, pg_core_1.timestamp)('start_time').notNull(),
    endTime: (0, pg_core_1.timestamp)('end_time'), // ✅ Ahora es nullable
    startStationId: (0, pg_core_1.varchar)('start_station_id', { length: 50 }).notNull().references(() => Station_1.stations.idStation),
    endStationId: (0, pg_core_1.varchar)('end_station_id', { length: 50 }).references(() => Station_1.stations.idStation), // ✅ Ya era nullable
    status: (0, pg_core_1.varchar)('status').notNull(),
    cost: (0, pg_core_1.decimal)('cost', { precision: 10, scale: 2 }).default('0')
});
exports.relationsLoan = (0, drizzle_orm_1.relations)(exports.loans, ({ many, one }) => ({
    user: one(User_1.users, {
        fields: [exports.loans.userId],
        references: [User_1.users.idUser]
    }),
    vehicle: one(Vehicle_1.vehicles, {
        fields: [exports.loans.vehicleId],
        references: [Vehicle_1.vehicles.idVehicle]
    }),
    startStation: one(Station_1.stations, {
        fields: [exports.loans.startStationId],
        references: [Station_1.stations.idStation]
    }),
    endStation: one(Station_1.stations, {
        fields: [exports.loans.endStationId],
        references: [Station_1.stations.idStation]
    }),
    payment: many(Payments_1.payments)
}));
