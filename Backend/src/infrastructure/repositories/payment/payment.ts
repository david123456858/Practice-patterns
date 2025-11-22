import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { Pool } from 'pg'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { DatabaseSql } from '../../database/data'
import { payments } from '../../database/Schemas/Payments'
import { Payment } from '../../../domain/entities/Payment/payment'

export class PaymentRepository implements ICrudOperations<Payment> {
  private readonly pool: NodePgDatabase<Record<string, never>> & { $client: Pool }

  constructor () {
    this.pool = DatabaseSql.getInstacne().getDb()
  }

  // 🔹 CREATE
  async save (data: Payment): Promise<void> {
    await this.pool.insert(payments).values({
      paymentId: data.getPaymentId(),
      loanId: data.getLoanId(),
      amount: data.getAmount().toString(), // decimal -> string
      paymentDate: data.getPaymentDate(),
      paymentMethod: data.getPaymethod(),
      status: data.getStatus()
    })
  }

  // 🔹 DELETE
  async delete (id: string): Promise<void> {
    await this.pool.delete(payments).where(eq(payments.paymentId, id))
  }

  // 🔹 UPDATE
  async update (data: Payment): Promise<void> {
    await this.pool
      .update(payments)
      .set({
        loanId: data.getLoanId(),
        amount: data.getAmount().toString(),
        paymentDate: data.getPaymentDate(),
        paymentMethod: data.getPaymethod(),
        status: data.getStatus()
      })
      .where(eq(payments.paymentId, data.getPaymentId()))
  }

  // 🔹 FIND BY ID
  async findById (id: string): Promise<any> {
    return await this.pool
      .select()
      .from(payments)
      .where(eq(payments.paymentId, id))
  }

  // 🔹 FIND BY LOAN ID
  async findByLoanId (loanId: string): Promise<any[]> {
    return await this.pool
      .select()
      .from(payments)
      .where(eq(payments.loanId, loanId))
  }

  // 🔹 FIND ALL
  async findAll (): Promise<any> {
    return await this.pool.select().from(payments)
  }
}
