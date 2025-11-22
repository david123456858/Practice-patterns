import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { Pool } from 'pg'

import { DatabaseSql } from '../../database/data'
import { vehicles } from '../../database/Schemas/Vehicle'
import { StatusVehicle } from '../../../domain/types/Vehicule/VehiculeEnum'
import { parseJson } from '../../../presentation/utils/parse/parse'

export class RepositoryVehicule {
  private readonly pool: NodePgDatabase<Record<string, never>> & { $client: Pool }

  constructor () {
    this.pool = DatabaseSql.getInstacne().getDb()
  }

  // 🔹 CREATE
  async save (data: any): Promise<void> {
    await this.pool.insert(vehicles).values({
      idVehicle: data.getIdVehicle(),
      color: data.getColor(),
      model: data.getModel(),
      stationId: data.getIdStation().idStation,
      state: data.getState(),
      type: data.getType(),
      latitude: data.getGeoLocation().getLatitude(),
      longitude: data.getGeoLocation().getLongitude(),
      locationTimestamp: new Date(data.getGeoLocation().getTimestamp()),
      maxUserWeight: data.getMaxUserWeight(),
      velocityMax: data.getVelocityMax(),
      costForMinute: data.getCostForMinute(),
      info: data.getInfo()
    })
  }

  // 🔹 DELETE
  async delete (id: string): Promise<void> {
    await this.pool.delete(vehicles).where(eq(vehicles.idVehicle, id))
  }

  // 🔹 UPDATE
  async update (data: any): Promise<void> {
    await this.pool.update(vehicles).set({
      color: data.color,
      model: data.model,
      stationId: data.stationId,
      state: data.state,
      type: data.type,
      latitude: data.latitude,
      longitude: data.longitude,
      locationTimestamp: new Date(data.locationTimestamp),
      maxUserWeight: data.maxUserWeight,
      velocityMax: data.velocityMax,
      costForMinute: data.costForMinute,
      info: data.info
    })
  }

  // 🔹 FIND BY ID
  async findById (id: string): Promise<any[]> {
    return parseJson(await this.pool
      .select()
      .from(vehicles)
      .where(eq(vehicles.idVehicle, id)))
  }

  // 🔹 FIND ALL
  async findAll (): Promise<any[]> {
    const result = await this.pool.select().from(vehicles)
    return parseJson(result)
  }

  // 🔹 FIND AVAILABLE VEHICLES
  async findByAvailable (): Promise<any[]> {
    const result = await this.pool
      .select()
      .from(vehicles)
      .where(eq(vehicles.state, StatusVehicle.AVAILABLE))

    return parseJson(result)
  }

  // 🔹 FIND AVAILABLE VEHICLES BY STATION
  async findByStationAvailable (idStation: string): Promise<any[]> {
    const result = await this.pool
      .select()
      .from(vehicles)
      .where(eq(vehicles.stationId, idStation))

    return parseJson(result)
  }
}
