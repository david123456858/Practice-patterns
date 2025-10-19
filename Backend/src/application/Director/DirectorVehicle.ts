import { VehicleDtoEspefic } from '../../domain/dtos/Vehicle/create'
import { Vehicle } from '../../domain/entities/Vehicule/VehicleGeneric/Vehicle'
import { BicycleElectricEstrategy } from '../../domain/strategies/vehicle/Electric/BicycleElectricStrategy'
import { ScooterElectricEstrategy } from '../../domain/strategies/vehicle/Electric/ScooterElectricStrategy'
import { SkateboardElectricEstrategy } from '../../domain/strategies/vehicle/Electric/SkateBoardElectricStrategy'
import { BicycleMechanicalEstrategy } from '../../domain/strategies/vehicle/Mechanic/BicycleMechanicStrategy'
import { ScooterMechanicalEstrategy } from '../../domain/strategies/vehicle/Mechanic/ScooterMechanicStrategy'
import { SkateboardMecanicEstrategy } from '../../domain/strategies/vehicle/Mechanic/SkateBoardMechanicStrategy'
import { VehicleStrategy } from '../../domain/strategies/vehicle/VehicleStrategy'
import { VehicleType } from '../../domain/types/Vehicule/VehiculeEnum'

export class VehicleDirector {
  private readonly providerEstrategies: Map<string, any>
  constructor () {
    this.providerEstrategies = new Map<string, VehicleStrategy>([
      [VehicleType.BICYCLE, new BicycleMechanicalEstrategy()],
      [VehicleType.ELECTRIC_BICYCLE, new BicycleElectricEstrategy()],
      [VehicleType.SCOOTER, new ScooterMechanicalEstrategy()],
      [VehicleType.ELECTRIC_SCOOTER, new ScooterElectricEstrategy()],
      [VehicleType.SKATEBOARD, new SkateboardMecanicEstrategy()],
      [VehicleType.ELECTRIC_SKATEBOARD, new SkateboardElectricEstrategy()]])
  }

  public construcVehicle (dto: VehicleDtoEspefic): Vehicle {
    const vehicleEstrategy: VehicleStrategy = this.providerEstrategies.get(dto.getVehicleType())
    return vehicleEstrategy.contruct(dto)
  }
}
