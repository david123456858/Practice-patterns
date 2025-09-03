import { ICrudOperations } from './../../../domain/interfaces/common/ICrud'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'
import { StatusVehicule } from '../../../domain/types/Vehicule/VehiculeEnum'

let vehiculeList: Vehicle[] = []

export class RepositoryVehicule implements ICrudOperations<Vehicle> {
  save (data: Vehicle): void {
    vehiculeList.push(data)
  }

  delete (id: string): void {
    vehiculeList = vehiculeList.filter(vehicule => vehicule.getId() !== id)
  }

  update (data: Vehicle): void {
    const index = vehiculeList.findIndex(vehicule => vehicule.getId() === data.getId())
    if (index !== -1) {
      vehiculeList[index] = data
    }
  }

  findById (id: string): Vehicle | undefined {
    return vehiculeList.find(vehicule => vehicule.getId() === id)
  }

  findAll (): Vehicle[] {
    return vehiculeList
  }

  findByAvailable (): Vehicle[] {
    return vehiculeList.filter(Vehicle => Vehicle.getStatus() === StatusVehicule.AVAILABLE)
  }

  findByStationAvailable (idStation: string): Vehicle[] {
    return vehiculeList.filter(vehicules => vehicules.getIdStation() === idStation && vehicules.getStatus() === StatusVehicule.AVAILABLE)
  }
}
