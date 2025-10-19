import { SkateboardMecanicBuilder } from '../../../builders/vehicle/Mecanic/SkateBoardMecanicBuilder'
import { Vehicle } from '../../../entities/Vehicule/VehicleGeneric/Vehicle'
import { StatusVehicle } from '../../../types/Vehicule/VehiculeEnum'
import { VehicleStrategy } from '../VehicleStrategy'

export class SkateboardMecanicEstrategy implements VehicleStrategy {
  private readonly builder: SkateboardMecanicBuilder
  constructor () {
    this.builder = new SkateboardMecanicBuilder()
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
    this.builder.setDeskSize(dto.propities.deckSize)
    this.builder.setMechanicalComponents(dto.propities.info)

    return this.builder.build()
  }
}
