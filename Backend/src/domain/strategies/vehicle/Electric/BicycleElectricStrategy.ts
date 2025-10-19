import { BicycleElectricBuilder } from '../../../builders/vehicle/Electric/BicycleElectricBuilder'
import { Vehicle } from '../../../entities/Vehicule/VehicleGeneric/Vehicle'
import { StatusVehicle } from '../../../types/Vehicule/VehiculeEnum'
import { VehicleStrategy } from '../VehicleStrategy'

export class BicycleElectricEstrategy implements VehicleStrategy {
  private readonly builder: BicycleElectricBuilder
  constructor () {
    this.builder = new BicycleElectricBuilder()
  }

  contruct (dto: any): Vehicle {
    this.builder.setIdVehicle(dto.getIdVehicle())
    this.builder.setColor(dto.getColor())
    this.builder.setModel(dto.getModel())
    this.builder.setStation(dto.getStation())
    this.builder.setState(StatusVehicle.AVAILABLE)
    this.builder.setGeoLocation(dto.getLocation())
    this.builder.setMaxUserWeight(dto.getMaxUserWeight())
    this.builder.setVelocityMax(dto.getCostForMinute())
    this.builder.setType(dto.getVehicleType())
    this.builder.setGears(dto.propities.gears)
    this.builder.setHasBasket(dto.propities.hasBasket)
    this.builder.setElectricComponents(dto.propities.info)

    return this.builder.build()
  }
}
