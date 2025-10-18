
import { MechanicalComponents } from './MechanicalComponents'
import { GeoLocation } from '../../../GeoLocation/GeoLocation'
import { Station } from '../../../Station/Station'
import { StatusVehicle, VehicleType } from '../../../../types/Vehicule/VehiculeEnum'
import { Bicycle } from '../../VehicleGeneric/Bicycle'

export class BicycleMechanic extends Bicycle {
  private info: MechanicalComponents

  constructor (
    idVehicle: string,
    color: string,
    model: string,
    station: Station,
    state: StatusVehicle,
    type: VehicleType,
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
      type,
      geoLocation,
      maxUserWeight,
      velocityMax,
      costForMinute,
      gears,
      hasBasket
    )

    this.info = mechanicalInfo
  }

  // Getters

  getMechanicalInfo (): MechanicalComponents {
    return this.info
  }

  // Setters

  setMechanicalInfo (info: MechanicalComponents): void {
    this.info = info
  }
}
