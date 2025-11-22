import { GeoLocation } from '../../../entities/GeoLocation/GeoLocation'
import { Station } from '../../../entities/Station/Station'
import { ElectricComponents } from '../../../entities/Vehicule/VehicleConcretes/Electric/ElectricComponets'
import { ScooterElectric } from '../../../entities/Vehicule/VehicleConcretes/Electric/ScooterElectric'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'
import { VehicleBuilder } from '../VehicleBuilder'

export class ScooterElectricBuilder implements VehicleBuilder {
  private idVehicle!: string
  private color!: string
  private model!: string
  private station!: Station
  private state!: StatusVehicle
  private type!: VehicleType
  private geoLocation!: GeoLocation
  private maxUserWeight!: number
  private velocityMax!: number
  private costForMinute!: number
  private hasSeat!: boolean
  private electricComponents!: ElectricComponents

  setIdVehicle (id: string): void { this.idVehicle = id }
  setColor (color: string): void { this.color = color }
  setModel (model: string): void { this.model = model }
  setStation (station: Station): void { this.station = station }
  setState (state: StatusVehicle): void { this.state = state }
  setType (type: VehicleType): void { this.type = type }
  setGeoLocation (geoLocation: GeoLocation): void { this.geoLocation = geoLocation }
  setMaxUserWeight (weight: number): void { this.maxUserWeight = weight }
  setVelocityMax (velocity: number): void { this.velocityMax = velocity }
  setCostForMinute (cost: number): void { this.costForMinute = cost }
  setHasSeat (hasSeat: boolean): void { this.hasSeat = hasSeat }
  setElectricComponents (components: ElectricComponents): void { this.electricComponents = components }

  build (): ScooterElectric {
    return new ScooterElectric(
      this.idVehicle,
      this.color,
      this.model,
      this.station,
      this.state,
      this.type,
      this.geoLocation,
      this.maxUserWeight,
      this.velocityMax,
      this.costForMinute,
      this.hasSeat,
      this.electricComponents
    )
  }
}
