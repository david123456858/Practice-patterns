import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator'

import { VehicleType } from '../../types/Vehicule/VehiculeEnum'

// DTO base para vehículos
export class BaseVehicleDto {
  @IsNotEmpty()
  @IsString()
    idVehicle!: string

  @IsEnum(VehicleType)
    vehicleType!: VehicleType

  @IsNotEmpty()
  @IsString()
    color!: string

  @IsNotEmpty()
  @IsString()
    model!: string

  @IsNotEmpty()
  @IsString()
    idStation!: string

  @IsNotEmpty()
  @IsNumber()
    latitude!: number

  @IsNotEmpty()
  @IsNumber()
    longitude!: number

  @IsNotEmpty()
  @IsNumber()
    maxUserWeight!: number

  @IsNotEmpty()
  @IsNumber()
    velocityMax!: number

  @IsNotEmpty()
  @IsNumber()
    costForMinute!: number
}

// DTO para crear bicicleta
export class BicycleDto {
  @IsNotEmpty()
  @IsNumber()
    gears!: number

  @IsNotEmpty()
  @IsBoolean()
    hasBasket!: boolean
}

// DTO para crear patineta
export class ScooterDto {
  @IsNotEmpty()
  @IsBoolean()
    hasSeat!: boolean
}

// DTO para crear skateboard
export class SkateboardDto {
  @IsNotEmpty()
  @IsNumber()
    deckSize!: number
}

// DTO unificado para la creación (discriminated union)
export type CreateVehicleDto =
  | BicycleDto
  | ScooterDto
  | SkateboardDto
