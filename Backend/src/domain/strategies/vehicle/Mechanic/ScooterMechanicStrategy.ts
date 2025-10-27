
import { ScooterMechanicalBuilder } from '../../../builders/vehicle/Mecanic/ScooterMecanicBuilder'
import { Vehicle } from '../../../entities/Vehicule/VehicleGeneric/Vehicle'
import { StatusVehicle } from '../../../types/Vehicule/VehiculeEnum'
import { VehicleStrategy } from '../VehicleStrategy'

export class ScooterMechanicalEstrategy implements VehicleStrategy {
  private readonly builder: ScooterMechanicalBuilder
  constructor () {
    this.builder = new ScooterMechanicalBuilder()
  }

  contruct (dto: any): Vehicle {
    this.builder.setIdVehicle(dto.getIdVehicle())
    this.builder.setColor(dto.getColor())
    this.builder.setModel(dto.getModel())
    this.builder.setStation(dto.getStation())
    this.builder.setState(StatusVehicle.AVAILABLE)
    this.builder.setGeoLocation(dto.getLocation())
    this.builder.setMaxUserWeight(dto.getMaxUserWeight())
    this.builder.setVelocityMax(dto.getVelocityMax())
    this.builder.setCostForMinute(dto.getCostForMinute())
    this.builder.setType(dto.getVehicleType())
    this.builder.setHasSeat(dto.propities.hasSeat)
    this.builder.setMechanicalComponents(dto.propities.info)

    return this.builder.build()
  }
}
