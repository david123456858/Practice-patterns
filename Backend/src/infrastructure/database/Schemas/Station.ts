import { relations } from 'drizzle-orm'
import { decimal, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { vehicles } from './Vehicle'

export const stations = pgTable('stations', {
  idStation: varchar('id_station', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  locationTimestamp: timestamp('location_timestamp').defaultNow().notNull()
})

export const relationsStations = relations(stations, ({ many }) => ({
  vechile: many(vehicles)
}))
