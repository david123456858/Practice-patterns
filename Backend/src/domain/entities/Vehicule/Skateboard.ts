import { StatusVehicle, VehicleType } from '../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../GeoLocation/GeoLocation'
import { Vehicle } from './Vehicle'

export class Skateboard extends Vehicle {
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
    private deckSize: number
  ) {
    super(idVehicle, color, model, idStation, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  setDeckSize (size: number): void { this.deckSize = size }
  getDeckSize (): number { return this.deckSize }
}
