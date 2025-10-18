import { BrakeType } from './../../types/Vehicule/BrakeTypeEnum'
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { DriveSystem } from '../../types/Vehicule/DriveSystemEnum'
import { BicycleDto, ScooterDto, SkateboardDto } from './classDto'
import { Type } from 'class-transformer'

// =========================================
// COMPONENTES MECÁNICOS Y ELÉCTRICOS
// =========================================
export class MechanicalComponents {
  @IsEnum(DriveSystem)
    driveSystem!: DriveSystem

  @IsEnum(BrakeType)
    Type!: BrakeType

  @IsString()
    bearingType!: string

  // ==== Getters ====
  getDriveSystem (): DriveSystem { return this.driveSystem }
  getType (): BrakeType { return this.Type }
  getBearingType (): string { return this.bearingType }
}

export class ElectricComponents {
  @IsNotEmpty()
  @IsNumber()
    capacity!: number

  @IsNotEmpty()
  @IsNumber()
    autonomyRange!: number

  // ==== Getters ====
  getCapacity (): number { return this.capacity }
  getAutonomyRange (): number { return this.autonomyRange }
}

// =========================================
// VEHÍCULOS MECÁNICOS
// =========================================
export class BicycleDtoMecanic extends BicycleDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents

  // ==== Getters ====
  getInfo (): MechanicalComponents { return this.info }
}

export class ScooterDtoMecanic extends ScooterDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents

  // ==== Getters ====
  getInfo (): MechanicalComponents { return this.info }
}

export class SkateBoardDtoMecanic extends SkateboardDto {
  @ValidateNested()
  @Type(() => MechanicalComponents)
    info!: MechanicalComponents

  // ==== Getters ====
  getInfo (): MechanicalComponents { return this.info }
}

// =========================================
// VEHÍCULOS ELÉCTRICOS
// =========================================
export class BicycleDtoElectric extends BicycleDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents

  // ==== Getters ====
  getInfo (): ElectricComponents { return this.info }
}

export class ScooterDtoElectric extends ScooterDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents

  // ==== Getters ====
  getInfo (): ElectricComponents { return this.info }
}

export class SkateBoardDtoElectric extends SkateboardDto {
  @ValidateNested()
  @Type(() => ElectricComponents)
    info!: ElectricComponents

  // ==== Getters ====
  getInfo (): ElectricComponents { return this.info }
}

// =========================================
// UNIÓN DE TIPOS CONCRETOS
// =========================================
export type ClassVehicleConcrete =
  | BicycleDtoMecanic
  | ScooterDtoMecanic
  | SkateBoardDtoMecanic
  | BicycleDtoElectric
  | ScooterDtoElectric
  | SkateBoardDtoElectric
