
import { VehicleDirector } from '../../../../application/Director/DirectorVehicle'
import { Vehicle } from '../../../entities/Vehicule/VehicleGeneric/Vehicle'
import { VehicleFactory } from '../Factory'

export class FactoryBicycle extends VehicleFactory {
  createVehicleElectric (vehicle: any): Vehicle {
    const director = new VehicleDirector()
    return director.construcVehicle(vehicle)
  }

  createVehicleMecacnic (vehicle: any): Vehicle {
    const director = new VehicleDirector()
    return director.construcVehicle(vehicle)
  }
}
