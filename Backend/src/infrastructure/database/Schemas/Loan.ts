import { decimal, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { users } from './User'
import { stations } from './Station'
import { relations } from 'drizzle-orm'
import { vehicles } from './Vehicle'
import { payments } from './Payments'

export const loans = pgTable('loans', {
  loanId: varchar('loan_id', { length: 50 }).primaryKey(),
  userId: varchar('user_id', { length: 50 }).notNull().references(() => users.idUser),
  vehicleId: varchar('vehicle_id', { length: 50 }).notNull().references(() => vehicles.idVehicle),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'), // ✅ Ahora es nullable
  startStationId: varchar('start_station_id', { length: 50 }).notNull().references(() => stations.idStation),
  endStationId: varchar('end_station_id', { length: 50 }).references(() => stations.idStation), // ✅ Ya era nullable
  status: varchar('status').notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }).default('0')
})

export const relationsLoan = relations(loans, ({ many, one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.idUser]
  }),
  vehicle: one(vehicles, {
    fields: [loans.vehicleId],
    references: [vehicles.idVehicle]
  }),
  startStation: one(stations, {
    fields: [loans.startStationId],
    references: [stations.idStation]
  }),
  endStation: one(stations, {
    fields: [loans.endStationId],
    references: [stations.idStation]
  }),
  payment: many(payments)
}))
