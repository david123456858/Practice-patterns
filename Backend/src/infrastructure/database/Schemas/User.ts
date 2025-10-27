import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { loans } from './Loan'

export const users = pgTable('users', {
  idUser: varchar('id_user', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('rol').notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const UserRelations = relations(users, ({ many }) => ({
  loan: many(loans)
}))
