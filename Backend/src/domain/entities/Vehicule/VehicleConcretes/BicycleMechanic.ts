import { Vehicle } from '../Vehicle'
import { MechanicalComponents } from './MechanicalComponents'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { Station } from '../../Station/Station'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'

export class BicycleMechanic extends Vehicle {
  private gears: number
  private hasBasket: boolean
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
    gears: number,
    hasBasket: boolean,
    mechanicalInfo: MechanicalComponents
  ) {
    super(
      idVehicle,
      color,
      model,
      station,
      state,
      VehicleType.BICYCLE,
      geoLocation,
      maxUserWeight,
      velocityMax,
      costForMinute
    )
    this.gears = gears
    this.hasBasket = hasBasket
    this.info = mechanicalInfo
  }

  // Getters
  getGears (): number {
    return this.gears
  }

  getHasBasket (): boolean {
    return this.hasBasket
  }

  getMechanicalInfo (): MechanicalComponents {
    return this.info
  }

  // Setters
  setGears (gears: number): void {
    this.gears = gears
  }

  setHasBasket (hasBasket: boolean): void {
    this.hasBasket = hasBasket
  }

  setMechanicalInfo (info: MechanicalComponents): void {
    this.info = info
  }
}
