"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationsStations = exports.stations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const Vehicle_1 = require("./Vehicle");
exports.stations = (0, pg_core_1.pgTable)('stations', {
    idStation: (0, pg_core_1.varchar)('id_station', { length: 50 }).primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    address: (0, pg_core_1.varchar)('address', { length: 255 }).notNull(),
    latitude: (0, pg_core_1.decimal)('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: (0, pg_core_1.decimal)('longitude', { precision: 11, scale: 8 }).notNull(),
    locationTimestamp: (0, pg_core_1.timestamp)('location_timestamp').defaultNow().notNull()
});
exports.relationsStations = (0, drizzle_orm_1.relations)(exports.stations, ({ many }) => ({
    vechile: many(Vehicle_1.vehicles)
}));
