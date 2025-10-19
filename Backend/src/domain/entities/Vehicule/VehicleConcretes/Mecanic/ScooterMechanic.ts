import { MechanicalComponents } from './MechanicalComponents'
import { GeoLocation } from '../../../GeoLocation/GeoLocation'
import { Station } from '../../../Station/Station'
import { StatusVehicle, VehicleType } from '../../../../types/Vehicule/VehiculeEnum'
import { Scooter } from '../../VehicleGeneric/Scooter'

export class ScooterMechanical extends Scooter {
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
    hasSeat: boolean,
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
      hasSeat
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
