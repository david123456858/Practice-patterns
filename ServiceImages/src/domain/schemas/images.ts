import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull()
}
export const Images = pgTable('Images', {
  idImages: varchar().primaryKey(),
  idVehicle: varchar().notNull(),
  fileName: varchar().notNull(),
  filePath: varchar().notNull(),
  fileSize: integer().notNull(),
  width: integer().notNull(),
  height: integer().notNull(),
  ...timestamps
})
