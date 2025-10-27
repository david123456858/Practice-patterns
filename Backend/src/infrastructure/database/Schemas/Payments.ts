import { decimal, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { loans } from './Loan'
import { relations } from 'drizzle-orm'

export const payments = pgTable('payments', {
  paymentId: varchar('payment_id', { length: 50 }).primaryKey(),
  loanId: varchar('loan_id', { length: 100 }).notNull().references(() => loans.loanId),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status').notNull(),
  paymentMethod: varchar('payment_method').notNull(),
  paymentDate: timestamp('payment_date').notNull()
})

export const relationsPayments = relations(payments, ({ one }) => ({
  loan: one(loans, {
    fields: [payments.loanId],
    references: [loans.loanId]
  })
}))
