import { ICrudOperations } from './../../../domain/interfaces/common/ICrud'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicle'
import { StatusVehicle } from '../../../domain/types/Vehicule/VehiculeEnum'

let vehiculeList: Vehicle[] = []

export class RepositoryVehicule implements ICrudOperations<Vehicle> {
  save (data: Vehicle): void {
    vehiculeList.push(data)
  }

  delete (id: string): void {
    vehiculeList = vehiculeList.filter(vehicule => vehicule.getIdVehicle() !== id)
  }

  update (data: Vehicle): void {
    const index = vehiculeList.findIndex(vehicule => vehicule.getIdVehicle() === data.getIdVehicle())
    if (index !== -1) {
      vehiculeList[index] = data
    }
  }

  findById (id: string): Vehicle | undefined {
    return vehiculeList.find(vehicule => vehicule.getIdVehicle() === id)
  }

  findAll (): Vehicle[] {
    return vehiculeList
  }

  findByAvailable (): Vehicle[] {
    return vehiculeList.filter(Vehicle => Vehicle.getState() === StatusVehicle.AVAILABLE)
  }

  findByStationAvailable (idStation: string): Vehicle[] {
    return vehiculeList.filter(vehicle =>
      vehicle.getIdStation() === idStation &&
      vehicle.getState() === StatusVehicle.AVAILABLE
    )
  }
}
