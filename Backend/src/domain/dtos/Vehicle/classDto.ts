import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEnum, ValidateNested, IsDateString } from 'class-validator'
import { VehicleType } from '../../types/Vehicule/VehiculeEnum'
import { Type } from 'class-transformer'

// =========================================
// DTO base para vehículos
// =========================================

export class GeoLocationDto {
  @IsNumber()
    latitude!: number

  @IsNumber()
    longitude!: number

  @IsDateString()
    timestamp!: string

  getLatitude (): number { return this.latitude }
  getLongitude (): number { return this.longitude }
  getTimestamp (): string { return this.timestamp }
}

class StationDto {
  @IsString()
  @IsNotEmpty()
    idStation!: string

  @IsString()
  @IsNotEmpty()
    name!: string

  @IsString()
  @IsNotEmpty()
    address!: string

  @ValidateNested()
  @Type(() => GeoLocationDto)
    geoLocation!: GeoLocationDto

  getIdStation (): string { return this.idStation }
  getName (): string { return this.name }
  getAddress (): string { return this.address }
  getGeoLocation (): GeoLocationDto { return this.geoLocation }
}
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
  @ValidateNested()
  @Type(() => StationDto)
    station!: StationDto

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GeoLocationDto)
    geolocation!: GeoLocationDto

  @IsNotEmpty()
  @IsNumber()
    maxUserWeight!: number

  @IsNotEmpty()
  @IsNumber()
    velocityMax!: number

  @IsNotEmpty()
  @IsNumber()
    costForMinute!: number

  // ==== Getters ====
  getIdVehicle (): string { return this.idVehicle }
  getVehicleType (): VehicleType { return this.vehicleType }
  getColor (): string { return this.color }
  getModel (): string { return this.model }
  getStation (): StationDto { return this.station }
  getLocation (): GeoLocationDto { return this.geolocation }
  getMaxUserWeight (): number { return this.maxUserWeight }
  getVelocityMax (): number { return this.velocityMax }
  getCostForMinute (): number { return this.costForMinute }
}

// =========================================
// DTO para crear bicicleta
// =========================================
export class BicycleDto {
  @IsNotEmpty()
  @IsNumber()
    gears!: number

  @IsNotEmpty()
  @IsBoolean()
    hasBasket!: boolean

  // ==== Getters ====
  getGears (): number { return this.gears }
  getHasBasket (): boolean { return this.hasBasket }
}

// =========================================
// DTO para crear scooter
// =========================================
export class ScooterDto {
  @IsNotEmpty()
  @IsBoolean()
    hasSeat!: boolean

  // ==== Getters ====
  getHasSeat (): boolean { return this.hasSeat }
}

// =========================================
// DTO para crear skateboard
// =========================================
export class SkateboardDto {
  @IsNotEmpty()
  @IsNumber()
    deckSize!: number

  // ==== Getters ====
  getDeckSize (): number { return this.deckSize }
}

// =========================================
// Tipo unificado
// =========================================
export type CreateVehicleDto =
  | BicycleDto
  | ScooterDto
  | SkateboardDto
