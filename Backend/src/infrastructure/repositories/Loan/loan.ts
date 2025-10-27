import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Loan } from '../../../domain/entities/Loan/Loan'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { DatabaseSql } from '../../database/data'
import { Pool } from 'pg'
import { loans } from '../../database/Schemas/Loan'
import { eq } from 'drizzle-orm'

export class RepositotyLoan implements ICrudOperations<Loan> {
  private readonly pool: NodePgDatabase<Record<string, never>> & { $client: Pool }

  constructor () {
    this.pool = DatabaseSql.getInstacne().getDb()
  }

  async save (data: Loan): Promise<void> {
    await this.pool.insert(loans).values({
      loanId: data.getLoanId(),
      userId: data.getUserId(),
      vehicleId: data.getVehicleId(),
      startTime: data.getStartTime(),
      endTime: data.getEndTime(),
      startStationId: data.getStartStationId(),
      status: data.getStatus(),
      endStationId: data.getEndStationId(),
      cost: data.getCost().toString()
    })
  }

  async delete (id: string): Promise<void> {
    await this.pool
      .delete(loans)
      .where(eq(loans.loanId, id))
  }

  async update (data: any): Promise<void> {
    await this.pool
      .update(loans)
      .set({
        userId: data.userId,
        vehicleId: data.vehicleId,
        startTime: data.startTime,
        endTime: data.endTime,
        startStationId: data.startStationId,
        endStationId: data.gendStationId,
        status: data.status,
        cost: data.cost
      })
      .where(eq(loans.loanId, data.loanId))
  }

  async findById (id: string): Promise<any> {
    return await this.pool
      .select()
      .from(loans)
      .where(eq(loans.loanId, id))
  }

  async findAll (): Promise<any> {
    const result = await this.pool.select().from(loans)
    return result
  }
}
