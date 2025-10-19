import { DriveSystem } from '../../../../types/Vehicule/DriveSystemEnum'
import { BrakeType } from '../../../../types/Vehicule/BrakeTypeEnum'

export class MechanicalComponents {
  private driveSystem: DriveSystem
  private brakeType: BrakeType
  private bearingType: string

  constructor (
    driveSystem: DriveSystem,
    brakeType: BrakeType,
    bearingType: string
  ) {
    this.driveSystem = driveSystem
    this.brakeType = brakeType
    this.bearingType = bearingType
  }

  // Getters
  getDriveSystem (): DriveSystem {
    return this.driveSystem
  }

  getBrakeType (): BrakeType {
    return this.brakeType
  }

  getBearingType (): string {
    return this.bearingType
  }

  // Setters
  setDriveSystem (driveSystem: DriveSystem): void {
    this.driveSystem = driveSystem
  }

  setBrakeType (brakeType: BrakeType): void {
    this.brakeType = brakeType
  }

  setBearingType (bearingType: string): void {
    this.bearingType = bearingType
  }
}
