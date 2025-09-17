import { Vehicle } from './Vehicle'
import { GeoLocation } from '../GeoLocation/GeoLocation'
import { StatusVehicle, VehicleType } from '../../types/Vehicule/VehiculeEnum'
import { Battery } from '../Battery/Battery'

export class CarElectric extends Vehicle {
  constructor (
    idVehicle: string,
    color: string,
    model: string,
    idStation: string,
    state: StatusVehicle,
    type: VehicleType,
    geoLocation: GeoLocation,
    maxUserWeight: number,
    velocityMax: number,
    costForMinute: number,
    private doors: number,
    private licensePlate: string,
    private batteryInfo: Battery,
    private hasAirConditioning: boolean
  ) {
    super(idVehicle, color, model, idStation, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  // Getters específicos de CarElectric
  getDoors (): number { return this.doors }
  getLicensePlate (): string { return this.licensePlate }
  getBatteryInfo (): Battery { return this.batteryInfo }
  getHasAirConditioning (): boolean { return this.hasAirConditioning }

  // Setters específicos de CarElectric
  setDoors (doors: number): void { this.doors = doors }
  setLicensePlate (plate: string): void { this.licensePlate = plate }
  setBatteryInfo (battery: Battery): void { this.batteryInfo = battery }
  setHasAirConditioning (has: boolean): void { this.hasAirConditioning = has }
}
