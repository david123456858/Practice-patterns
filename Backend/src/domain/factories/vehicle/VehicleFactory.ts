/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-extraneous-class */
// src/domain/factories/Vehicle/VehicleFactory.ts
import { VehicleType } from '../../types/Vehicule/VehiculeEnum'
import { Vehicle } from '../../entities/Vehicule/Vehicle'
import { Bicycle } from '../../entities/Vehicule/Bicycle'
import { ElectricScooter } from '../../entities/Vehicule/ElectricScooter'
import { Skateboard } from '../../entities/Vehicule/Skateboard'
import { CarElectric } from '../../entities/Vehicule/CarElectric'
import { Battery } from '../../entities/Battery/Battery'
import { GeoLocation } from '../../entities/GeoLocation/GeoLocation'
import {
  CreateBicycleDto,
  CreateElectricScooterDto,
  CreateSkateboardDto,
  CreateCarElectricDto,
  CreateVehicleDto
} from '../../dtos/Vehicle/create'

export class VehicleFactory {
  static createVehicle (vehicleDto: CreateVehicleDto): Vehicle {
    const geoLocation = new GeoLocation(vehicleDto.latitude, vehicleDto.longitude)

    switch (vehicleDto.vehicleType) {
      case VehicleType.BICYCLE:
        const bicycleDto = vehicleDto as CreateBicycleDto
        return new Bicycle(
          bicycleDto.idVehicle,
          bicycleDto.color,
          bicycleDto.model,
          bicycleDto.idStation,
          bicycleDto.state,
          geoLocation,
          vehicleDto.vehicleType,
          bicycleDto.maxUserWeight,
          bicycleDto.velocityMax,
          bicycleDto.costForMinute,
          bicycleDto.gears,
          bicycleDto.hasBasket
        )

      case VehicleType.ELECTRIC_SCOOTER:
        const scooterDto = vehicleDto as CreateElectricScooterDto
        const scooterBattery = new Battery(
          scooterDto.batteryInfo.capacity,
          scooterDto.batteryInfo.autonomyRange
        )
        return new ElectricScooter(
          scooterDto.idVehicle,
          scooterDto.color,
          scooterDto.model,
          scooterDto.idStation,
          scooterDto.state,
          vehicleDto.vehicleType,
          geoLocation,
          scooterDto.maxUserWeight,
          scooterDto.velocityMax,
          scooterDto.costForMinute,
          scooterDto.hasSeat,
          scooterBattery
        )

      case VehicleType.SKATEBOARD:
        const skateboardDto = vehicleDto as CreateSkateboardDto
        return new Skateboard(
          skateboardDto.idVehicle,
          skateboardDto.color,
          skateboardDto.model,
          skateboardDto.idStation,
          skateboardDto.state,
          vehicleDto.vehicleType,
          geoLocation,
          skateboardDto.maxUserWeight,
          skateboardDto.velocityMax,
          skateboardDto.costForMinute,
          skateboardDto.deckSize
        )

      case VehicleType.CAR_ELECTRIC:
        const carDto = vehicleDto as CreateCarElectricDto
        const carBattery = new Battery(
          carDto.batteryInfo.capacity,
          carDto.batteryInfo.autonomyRange
        )
        return new CarElectric(
          carDto.idVehicle,
          carDto.color,
          carDto.model,
          carDto.idStation,
          carDto.state,
          vehicleDto.vehicleType,
          geoLocation,
          carDto.maxUserWeight,
          carDto.velocityMax,
          carDto.costForMinute,
          carDto.doors,
          carDto.licensePlate,
          carBattery,
          carDto.hasAirConditioning
        )

      default:
        throw new Error(`Tipo de vehículo no soportado: ${vehicleDto.vehicleType}`)
    }
  }
}
