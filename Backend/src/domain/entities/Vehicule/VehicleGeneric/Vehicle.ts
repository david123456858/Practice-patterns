import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'
import { Station } from '../../Station/Station'

export abstract class Vehicle {
  constructor (
    protected readonly idVehicle: string,
    protected color: string,
    protected model: string,
    protected Station: Station,
    protected state: StatusVehicle,
    protected type: VehicleType,
    protected geoLocation: GeoLocation,
    protected maxUserWeight: number,
    protected velocityMax: number,
    protected costForMinute: number
  ) {}

  // Getters
  getIdVehicle (): string { return this.idVehicle }
  getColor (): string { return this.color }
  getModel (): string { return this.model }
  getIdStation (): Station { return this.Station }
  getState (): StatusVehicle { return this.state }
  getGeoLocation (): GeoLocation { return this.geoLocation }
  getMaxUserWeight (): number { return this.maxUserWeight }
  getVelocityMax (): number { return this.velocityMax }
  getCostForMinute (): number { return this.costForMinute }

  // Setters
  setColor (color: string): void { this.color = color }
  setModel (model: string): void { this.model = model }
  setIdStation (idStation: Station): void { this.Station = idStation }
  setState (state: StatusVehicle): void { this.state = state }
  setGeoLocation (geoLocation: GeoLocation): void { this.geoLocation = geoLocation }
  setMaxUserWeight (weight: number): void { this.maxUserWeight = weight }
  setVelocityMax (velocity: number): void { this.velocityMax = velocity }
  setCostForMinute (cost: number): void { this.costForMinute = cost }
}
