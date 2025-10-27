import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { DatabaseSql } from '../../database/data'
import { Pool } from 'pg'
import { stations } from '../../database/Schemas/Station'

export class RepositoryStation implements ICrudOperations<Station> {
  private readonly pool: NodePgDatabase<Record<string, never>> & { $client: Pool }

  constructor () {
    this.pool = DatabaseSql.getInstacne().getDb()
  }

  async save (data: any): Promise<void> {
    await this.pool.insert(stations).values({
      idStation: data.getId(),
      name: data.getName(),
      address: data.getAdress(),
      latitude: data.getGeoLocation().getLatitude(),
      longitude: data.getGeoLocation().getLongitude(),
      locationTimestamp: data.getGeoLocation().getTimestamp()
    })
  }

  async delete (id: string): Promise<void> {
    await this.pool
      .delete(stations)
      .where(eq(stations.idStation, id))
  }

  async update (data: Station): Promise<void> {
    await this.pool
      .update(stations)
      .set({
        idStation: data.getId(),
        name: data.getName(),
        address: data.getAdress(),
        latitude: data.getGeoLocation().getLatitude().toString(),
        longitude: data.getGeoLocation().getLongitude().toString(),
        locationTimestamp: data.getGeoLocation().getTimestamp()
      })
      .where(eq(stations.idStation, data.getId()))
  }

  async findById (id: string): Promise<any> {
    const result = await this.pool
      .select()
      .from(stations)
      .where(eq(stations.idStation, id))
    return result[0]
  }

  async findAll (): Promise<any> {
    return await this.pool.select().from(stations)
  }
}
