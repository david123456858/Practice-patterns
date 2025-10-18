/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { VehicleType } from '../../../domain/types/Vehicule/VehiculeEnum'
import { FactoryBicycle } from '../../factories/vehicle/concrete/FactoryBicecly'
import { FactoryScooter } from '../../factories/vehicle/concrete/FactoryScooter'
import { FactorySkateboard } from '../../factories/vehicle/concrete/FactorySkacteboard'
import { VehicleFactory } from '../vehicle/Factory'

export class ProviderVehicle {
  private static instance: ProviderVehicle
  private readonly providerFactory: Map<any, any> = new Map()

  private constructor () {
    this.registerGroup([VehicleType.BICYCLE, VehicleType.ELECTRIC_BICYCLE], new FactoryBicycle())
    this.registerGroup([VehicleType.SCOOTER, VehicleType.ELECTRIC_SCOOTER], new FactoryScooter())
    this.registerGroup([VehicleType.SKATEBOARD, VehicleType.ELECTRIC_SKATEBOARD], new FactorySkateboard())
  }

  private registerGroup (keys: string[], baseKey: VehicleFactory): void {
    for (const key of keys) {
      this.providerFactory.set(key, baseKey)
    }
  }

  public static getInstance (): ProviderVehicle {
    if (!this.instance) {
      this.instance = new ProviderVehicle()
    }
    return this.instance
  }

  public getFactory (type: string): VehicleFactory {
    return this.providerFactory.get(type)
  }
}
