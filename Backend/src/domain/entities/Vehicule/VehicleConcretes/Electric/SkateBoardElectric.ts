import { Skateboard } from '../../VehicleGeneric/Skateboard'
import { StatusVehicle, VehicleType } from '../../../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../../../GeoLocation/GeoLocation'
import { Station } from '../../../Station/Station'
import { ElectricComponents } from './ElectricComponets'

export class SkateboardElectric extends Skateboard {
  private info: ElectricComponents

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
    deckSize: number,
    mechanicalInfo: ElectricComponents
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
      deckSize
    )
    this.info = mechanicalInfo
  }

  // Getters

  getMechanicalInfo (): ElectricComponents {
    return this.info
  }

  // Setters

  setMechanicalInfo (info: ElectricComponents): void {
    this.info = info
  }
}
