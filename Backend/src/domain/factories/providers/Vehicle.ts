import { VehicleType } from '../../types/Vehicule/VehiculeEnum'

export class ProviderVehicle {
  private readonly factoryVehicle: Map<string, any>

  constructor () {
    const provider: Array<[string, any]> = [
      [VehicleType.BICYCLE, ''],
      [VehicleType.ELECTRIC_BICYCLE, ''],
      [VehicleType.SCOOTER, ''],
      [VehicleType.ELECTRIC_SCOOTER, ''],
      [VehicleType.SKATEBOARD, ''],
      [VehicleType.ELECTRIC_SKATEBOARD, ''],
      [VehicleType.CAR_ELECTRIC, '']
    ]
    this.factoryVehicle = new Map(provider)
  }

  public getProviderVehicle (type: string): any {
    return this.factoryVehicle.get(type)
  }
}
