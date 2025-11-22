/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'dotenv/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export class DatabaseSql {
  private static instance: DatabaseSql
  private readonly db: NodePgDatabase<Record<string, never>> & { $client: Pool }

  private constructor () {
    this.db = drizzle(process.env.DATABASE_URL!)
  }

  public static getInstacne (): DatabaseSql {
    if (!this.instance) {
      this.instance = new DatabaseSql()
    }
    return this.instance
  }

  public getDb (): NodePgDatabase<Record<string, never>> & { $client: Pool } {
    return this.db
  }
}
