"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationsVehicles = exports.vehicles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Station_1 = require("./Station");
const drizzle_orm_1 = require("drizzle-orm");
exports.vehicles = (0, pg_core_1.pgTable)('vehicles', {
    idVehicle: (0, pg_core_1.varchar)('id_vehicle', { length: 50 }).primaryKey(),
    color: (0, pg_core_1.varchar)('color', { length: 50 }).notNull(),
    model: (0, pg_core_1.varchar)('model', { length: 100 }).notNull(),
    stationId: (0, pg_core_1.varchar)('station_id', { length: 50 }).notNull().references(() => Station_1.stations.idStation),
    state: (0, pg_core_1.varchar)('state').notNull().default('AVAILABLE'),
    type: (0, pg_core_1.varchar)('type').notNull(),
    latitude: (0, pg_core_1.decimal)('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: (0, pg_core_1.decimal)('longitude', { precision: 11, scale: 8 }).notNull(),
    locationTimestamp: (0, pg_core_1.timestamp)('location_timestamp').defaultNow().notNull(),
    maxUserWeight: (0, pg_core_1.decimal)('max_user_weight', { precision: 5, scale: 2 }).notNull(),
    velocityMax: (0, pg_core_1.decimal)('velocity_max', { precision: 5, scale: 2 }).notNull(),
    costForMinute: (0, pg_core_1.decimal)('cost_for_minute', { precision: 10, scale: 2 }).notNull(),
    info: (0, pg_core_1.text)('info').$type()
});
exports.relationsVehicles = (0, drizzle_orm_1.relations)(exports.vehicles, ({ one }) => ({
    station: one(Station_1.stations, {
        fields: [exports.vehicles.stationId],
        references: [Station_1.stations.idStation]
    })
}));
