import { Vehicle } from './Vehicle'
import { GeoLocation } from '../GeoLocation/GeoLocation'
import { StatusVehicle } from '../../types/Vehicule/VehiculeEnum'

export class Bicycle extends Vehicle {
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
    private gears: number,
    private hasBasket: boolean
  ) {
    super(idVehicle, color, model, idStation, state, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  // Getters específicos de Bicycle
  getGears (): number { return this.gears }
  getHasBasket (): boolean { return this.hasBasket }

  // Setters específicos de Bicycle
  setGears (gears: number): void { this.gears = gears }
  setHasBasket (hasBasket: boolean): void { this.hasBasket = hasBasket }
}
