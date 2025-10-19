/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VehicleDirector } from '../../../../application/Director/DirectorVehicle'
import { VehicleFactory } from '../Factory'

export class FactorySkateboard extends VehicleFactory {
  createVehicleElectric (vehicle: any) {
    const director = new VehicleDirector()
    return director.construcVehicle(vehicle)
  }

  createVehicleMecacnic (vehicle: any) {
    const director = new VehicleDirector()
    return director.construcVehicle(vehicle)
  }
}
