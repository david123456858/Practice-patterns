import { decimal, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { stations } from './Station'
import { relations } from 'drizzle-orm'

export const vehicles = pgTable('vehicles', {
  idVehicle: varchar('id_vehicle', { length: 50 }).primaryKey(),
  color: varchar('color', { length: 50 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  stationId: varchar('station_id', { length: 50 }).notNull().references(() => stations.idStation),
  state: varchar('state').notNull().default('AVAILABLE'),
  type: varchar('type').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  locationTimestamp: timestamp('location_timestamp').defaultNow().notNull(),
  maxUserWeight: decimal('max_user_weight', { precision: 5, scale: 2 }).notNull(),
  velocityMax: decimal('velocity_max', { precision: 5, scale: 2 }).notNull(),
  costForMinute: decimal('cost_for_minute', { precision: 10, scale: 2 }).notNull(),
  info: text('info').$type<Record<string, any>>()
})

export const relationsVehicles = relations(vehicles, ({ one }) => ({
  station: one(stations, {
    fields: [vehicles.stationId],
    references: [stations.idStation]
  })

}))
