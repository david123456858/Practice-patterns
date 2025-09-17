import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateNested, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { VehicleType, StatusVehicle } from '../../types/Vehicule/VehiculeEnum'

// DTO base para vehículos
export class BaseVehicleDto {
  @IsNotEmpty()
  @IsString()
    idVehicle!: string

  @IsNotEmpty()
  @IsString()
    color!: string

  @IsNotEmpty()
  @IsString()
    model!: string

  @IsNotEmpty()
  @IsString()
    idStation!: string

  @IsEnum(StatusVehicle)
    state!: StatusVehicle

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

  @IsEnum(VehicleType)
    vehicleType!: VehicleType
}

// DTO para información de batería
export class BatteryDto {
  @IsNotEmpty()
  @IsNumber()
    capacity!: number

  @IsNotEmpty()
  @IsNumber()
    autonomyRange!: number
}

// DTO para crear bicicleta
export class CreateBicycleDto extends BaseVehicleDto {
  @IsNotEmpty()
  @IsNumber()
    gears!: number

  @IsNotEmpty()
  @IsBoolean()
    hasBasket!: boolean
}

// DTO para crear patineta eléctrica
export class CreateElectricScooterDto extends BaseVehicleDto {
  @IsNotEmpty()
  @IsBoolean()
    hasSeat!: boolean

  @ValidateNested()
  @Type(() => BatteryDto)
    batteryInfo!: BatteryDto
}

// DTO para crear skateboard
export class CreateSkateboardDto extends BaseVehicleDto {
  @IsNotEmpty()
  @IsNumber()
    deckSize!: number
}

// DTO para crear carro eléctrico
export class CreateCarElectricDto extends BaseVehicleDto {
  @IsNotEmpty()
  @IsNumber()
    doors!: number

  @IsNotEmpty()
  @IsString()
    licensePlate!: string

  @ValidateNested()
  @Type(() => BatteryDto)
    batteryInfo!: BatteryDto

  @IsNotEmpty()
  @IsBoolean()
    hasAirConditioning!: boolean
}

// DTO unificado para la creación (discriminated union)
export type CreateVehicleDto =
  | CreateBicycleDto
  | CreateElectricScooterDto
  | CreateSkateboardDto
  | CreateCarElectricDto
