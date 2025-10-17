import { Vehicle } from '../Vehicle'
import { MechanicalComponents } from './MechanicalComponents'
import { GeoLocation } from '../../GeoLocation/GeoLocation'
import { Station } from '../../Station/Station'
import { StatusVehicle, VehicleType } from '../../../types/Vehicule/VehiculeEnum'

export class ScooterMechanic extends Vehicle {
  private hasSeat: boolean
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
    hasSeat: boolean,
    mechanicalInfo: MechanicalComponents
  ) {
    super(
      idVehicle,
      color,
      model,
      station,
      state,
      VehicleType.SCOOTER,
      geoLocation,
      maxUserWeight,
      velocityMax,
      costForMinute
    )
    this.hasSeat = hasSeat
    this.info = mechanicalInfo
  }

  // Getters
  getHasSeat (): boolean {
    return this.hasSeat
  }

  getMechanicalInfo (): MechanicalComponents {
    return this.info
  }

  // Setters
  setHasSeat (hasSeat: boolean): void {
    this.hasSeat = hasSeat
  }

  setMechanicalInfo (info: MechanicalComponents): void {
    this.info = info
  }
}
