import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { Vehicle } from './Vehicle'
import { Station } from '../../Station/Station'

export class Skateboard extends Vehicle {
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
    private deckSize: number
  ) {
    super(idVehicle, color, model, Station, state, type, geoLocation, maxUserWeight, velocityMax, costForMinute)
  }

  setDeckSize (size: number): void { this.deckSize = size }
  getDeckSize (): number { return this.deckSize }
}
