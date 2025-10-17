import { BrakeType } from './../../types/Vehicule/BrakeTypeEnum'

import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { DriveSystem } from '../../types/Vehicule/DriveSystemEnum'
import { BicycleDto, ScooterDto, SkateboardDto } from './classDto'
import { Type } from 'class-transformer'

export class MechanicalComponents {
  @IsEnum(DriveSystem)
    driveSystem!: DriveSystem

  @IsEnum(BrakeType)
    Type!: BrakeType

  @IsString()
    bearingType!: string
}

export class ElectricComponents {
  @IsNotEmpty()
  @IsNumber()
    capacity!: number

  @IsNotEmpty()
  @IsNumber()
    autonomyRange!: number
}

// Vehiculos mecacnicos ------------------------
export class BicycleDtoMecanic extends BicycleDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents
}
export class ScooterDtoMecanic extends ScooterDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents
}

export class SkateBoardDtoMecanic extends SkateboardDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents
}
// vehiculos electricos -------------------------------------

export class BicycleDtoElectric extends BicycleDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents
}
export class ScooterDtoElectric extends ScooterDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents
}

export class SkateBoardDtoElectric extends SkateboardDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents
}

export type ClassVehicleConcrete =
  | BicycleDtoMecanic
  | ScooterDtoMecanic
  | SkateBoardDtoMecanic
  | BicycleDtoElectric
  | ScooterDtoElectric
  | SkateBoardDtoElectric
