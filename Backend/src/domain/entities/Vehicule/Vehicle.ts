import { GeoLocation } from '../GeoLocation/GeoLocation'
import { StatusVehicle } from '../../types/Vehicule/VehiculeEnum'

export abstract class Vehicle {
  constructor (
    protected readonly idVehicle: string,
    protected color: string,
    protected model: string,
    protected idStation: string,
    protected state: StatusVehicle,
    protected geoLocation: GeoLocation,
    protected maxUserWeight: number,
    protected velocityMax: number,
    protected costForMinute: number
  ) {}

  // Getters
  getIdVehicle (): string { return this.idVehicle }
  getColor (): string { return this.color }
  getModel (): string { return this.model }
  getIdStation (): string { return this.idStation }
  getState (): StatusVehicle { return this.state }
  getGeoLocation (): GeoLocation { return this.geoLocation }
  getMaxUserWeight (): number { return this.maxUserWeight }
  getVelocityMax (): number { return this.velocityMax }
  getCostForMinute (): number { return this.costForMinute }

  // Setters
  setColor (color: string): void { this.color = color }
  setModel (model: string): void { this.model = model }
  setIdStation (idStation: string): void { this.idStation = idStation }
  setState (state: StatusVehicle): void { this.state = state }
  setGeoLocation (geoLocation: GeoLocation): void { this.geoLocation = geoLocation }
  setMaxUserWeight (weight: number): void { this.maxUserWeight = weight }
  setVelocityMax (velocity: number): void { this.velocityMax = velocity }
  setCostForMinute (cost: number): void { this.costForMinute = cost }
}
