import { Vehicle } from './Vehicle'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'
import { Station } from '../../Station/Station'

export class Bicycle extends Vehicle {
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
    private gears: number,
    private hasBasket: boolean
  ) {
    super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  // Getters específicos de Bicycle
  getGears (): number { return this.gears }
  getHasBasket (): boolean { return this.hasBasket }

  // Setters específicos de Bicycle
  setGears (gears: number): void { this.gears = gears }
  setHasBasket (hasBasket: boolean): void { this.hasBasket = hasBasket }
}
