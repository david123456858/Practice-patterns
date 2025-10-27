import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { ImagesVehicle } from '../../domain/entities/ImagesVehicle.js'
import { OperationsImages } from '../../domain/interfaces/OperationsBase.js'
import { Images } from '../../domain/schemas/images.js'
import { DatabaseSql } from '../database/db.js'
import { Pool, QueryResult } from 'pg'
import { eq } from 'drizzle-orm'

export class repositoryImages implements OperationsImages<ImagesVehicle> {
  private readonly poolDb: NodePgDatabase<Record<string, never>> & { $client: Pool }
  constructor () {
    this.poolDb = DatabaseSql.getInstacne().getDb()
  }

  async upload (payload: ImagesVehicle): Promise<QueryResult<never>> {
    const ImagesCreated = await this.poolDb.insert(Images).values({
      idImages: payload.getIdImages(),
      idVehicle: payload.getIdVehicle(),
      fileName: payload.getFileName(),
      filePath: payload.getFilePath(),
      fileSize: payload.getFileSize(),
      width: payload.getWidth(),
      height: payload.getHeight()
    })
    return ImagesCreated
  }

  async get (): Promise<any[]> {
    return await this.poolDb.select().from(Images)
  }

  async getById (id: string): Promise<any[]> {
    return await this.poolDb.select().from(Images).where(eq(Images.idImages, id))
  }

  async getByIdVehicle (id: string): Promise<any[]> {
    return await this.poolDb.select().from(Images).where(eq(Images.idVehicle, id))
  }

  async delete (): Promise<void> {

  }
}
