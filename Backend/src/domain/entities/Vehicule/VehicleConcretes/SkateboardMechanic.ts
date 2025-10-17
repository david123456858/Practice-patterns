import { Vehicle } from '../Vehicle'
import { MechanicalComponents } from './MechanicalComponents'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { Station } from '../../Station/Station'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'

export class SkateboardMechanic extends Vehicle {
  private deckSize: number
  private info: MechanicalComponents

  constructor (
    idVehicle: string,
    color: string,
    model: string,
    station: Station,
    state: StatusVehicle,
    geoLocation: GeoLocation,
    maxUserWeight: number,
    velocityMax: number,
    costForMinute: number,
    deckSize: number,
    mechanicalInfo: MechanicalComponents
  ) {
    super(
      idVehicle,
      color,
      model,
      station,
      state,
      VehicleType.SKATEBOARD,
      geoLocation,
      maxUserWeight,
      velocityMax,
      costForMinute
    )
    this.deckSize = deckSize
    this.info = mechanicalInfo
  }

  // Getters
  getDeckSize (): number {
    return this.deckSize
  }

  getMechanicalInfo (): MechanicalComponents {
    return this.info
  }

  // Setters
  setDeckSize (deckSize: number): void {
    this.deckSize = deckSize
  }

  setMechanicalInfo (info: MechanicalComponents): void {
    this.info = info
  }
}
