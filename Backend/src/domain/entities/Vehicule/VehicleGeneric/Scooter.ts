import { Vehicle } from './Vehicle'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'
import { Station } from '../../Station/Station'

export class Scooter extends Vehicle {
  constructor (
    idVehicle: string,
    color: string,
    model: string,
    Station: Station,
    state: StatusVehicle,
    type: VehicleType,
    geoLocation: GeoLocation,
    maxUserWeight: number,
    velocityMax: number,
    costForMinute: number,
    private hasSeat: boolean
  ) {
    super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  // Getters específicos de ElectricScooter
  getHasSeat (): boolean { return this.hasSeat }

  // Setters específicos de ElectricScooter
  setHasSeat (hasSeat: boolean): void { this.hasSeat = hasSeat }
}
