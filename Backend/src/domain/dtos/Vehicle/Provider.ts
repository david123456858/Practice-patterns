import { VehicleType } from '../../types/Vehicule/VehiculeEnum'
import { BicycleDtoElectric, BicycleDtoMecanic, ClassVehicleConcrete, ScooterDtoElectric, ScooterDtoMecanic, SkateBoardDtoElectric, SkateBoardDtoMecanic } from './concreteDto'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export class ProviderTypeVehicle {
  private static instance: ProviderTypeVehicle

  private readonly ProviderTypeVehicle: Map<VehicleType, ClassVehicleConcrete> =
    new Map<VehicleType, any>([
      [VehicleType.BICYCLE, BicycleDtoMecanic],
      [VehicleType.ELECTRIC_BICYCLE, BicycleDtoElectric],
      [VehicleType.SCOOTER, ScooterDtoMecanic],
      [VehicleType.ELECTRIC_SCOOTER, ScooterDtoElectric],
      [VehicleType.SKATEBOARD, SkateBoardDtoMecanic],
      [VehicleType.ELECTRIC_SKATEBOARD, SkateBoardDtoElectric]
    ])

  static getInstance (): ProviderTypeVehicle {
    if (!this.instance) {
      this.instance = new ProviderTypeVehicle()
    }
    return this.instance
  }

  public getVehicleClass (id: VehicleType): any {
    const providerd = this.ProviderTypeVehicle.get(id)

    if (!providerd) {
      console.warn(`Provider ${id} not found, returning base VMDTO`)
    }

    return providerd
  }
}
