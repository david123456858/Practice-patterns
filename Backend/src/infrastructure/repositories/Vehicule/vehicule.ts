import { ICrudOperations } from './../../../domain/interfaces/common/ICrud'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'
import { StatusVehicle } from '../../../domain/types/Vehicule/VehiculeEnum'
import { TypeVehicule } from '../../../domain/entities/TypeVehicule/TypeVehicule'
import { GeoLocation } from '../../../domain/entities/GeoLocation/GeoLocation'

let vehiculeList: Vehicle[] = [
  new Vehicle('1', '1', new GeoLocation(1.2151, 244.5423232), StatusVehicle.AVAILABLE, new TypeVehicule('bicicletas', 100)),
  new Vehicle('2', '1', new GeoLocation(1.2151, 244.5423232), StatusVehicle.AVAILABLE, new TypeVehicule('patinetas', 500))]

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
    return vehiculeList.filter(Vehicle => Vehicle.getStatus() === StatusVehicle.AVAILABLE)
  }

  findByStationAvailable (idStation: string): Vehicle[] {
    return vehiculeList.filter(vehicules => vehicules.getIdStation() === idStation && vehicules.getStatus() === StatusVehicle.AVAILABLE)
  }
}
