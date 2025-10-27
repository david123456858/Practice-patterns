/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { eq } from 'drizzle-orm'
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { DatabaseSql } from '../../database/data'
import { users } from '../../database/Schemas/User'

export class UserRepository implements ICrudOperations<User> {
  private readonly pool: NodePgDatabase<Record<string, never>> & { $client: Pool }

  constructor () {
    this.pool = DatabaseSql.getInstacne().getDb()
  }

  async findAll (): Promise<any> {
    return await this.pool.select().from(users)
  }

  async save (data: User): Promise<void> {
    await this.pool.insert(users).values({
      idUser: data.getCC(),
      name: data.getName(),
      lastName: data.getLastName(),
      email: data.getEmail(),
      password: data.getPassword(),
      role: data.getRole().getName()
    })
  }

  async delete (id: string): Promise<void> {
    await this.pool.delete(users).where(eq(users.email, id))
  }

  async update (data: any): Promise<void> {
    await this.pool.update(users).set({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role
    }).where(eq(users.email, data.email))
  }

  async findByEmail (email: string): Promise<any[]> {
    return await this.pool.select().from(users).where(eq(users.email, email))
  }

  async findById (id: string): Promise<any[]> {
    return await this.pool.select().from(users).where(eq(users.idUser, id))
  }
}
