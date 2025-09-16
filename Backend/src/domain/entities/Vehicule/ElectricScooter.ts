import { Vehicle } from './Vehicle'
import { GeoLocation } from '../GeoLocation/GeoLocation'
import { StatusVehicle } from '../../types/Vehicule/VehiculeEnum'
import { Battery } from '../Battery/Battery'

export class ElectricScooter extends Vehicle {
  constructor (
    idVehicle: string,
    color: string,
    model: string,
    idStation: string,
    state: StatusVehicle,
    geoLocation: GeoLocation,
    maxUserWeight: number,
    velocityMax: number,
    costForMinute: number,
    private hasSeat: boolean,
    private batteryInfo: Battery
  ) {
    super(idVehicle, color, model, idStation, state, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  // Getters específicos de ElectricScooter
  getHasSeat (): boolean { return this.hasSeat }
  getBatteryInfo (): Battery { return this.batteryInfo }

  // Setters específicos de ElectricScooter
  setHasSeat (hasSeat: boolean): void { this.hasSeat = hasSeat }
  setBatteryInfo (battery: Battery): void { this.batteryInfo = battery }
}
