/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VehicleFactory } from '../VehicleFactory'

export class FactoryBicycle extends VehicleFactory {
  createVehicleElectric (vehicle: any) {
    throw new Error('Method not implemented.')
  }

  createVehicleMecacnic (vehicle: any) {
    throw new Error('Method not implemented.')
  }
}
