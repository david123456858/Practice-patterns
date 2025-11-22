import { StatusVehicle, VehicleType } from '../../../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../../../GeoLocation/GeoLocation'
import { Station } from '../../../Station/Station'
import { Scooter } from '../../VehicleGeneric/Scooter'
import { ElectricComponents } from './ElectricComponets'

export class ScooterElectric extends Scooter {
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
    hasSeat: boolean,
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
      hasSeat
    )

    this.info = mechanicalInfo
  }

  getInfo (): ElectricComponents {
    return this.info
  }

  // Setters

  setInfo (info: ElectricComponents): void {
    this.info = info
  }
}
