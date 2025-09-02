import { ICrudOperations } from './../../../domain/interfaces/common/ICrud'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'

export class RepositoryVehicule implements ICrudOperations<Vehicle> {
  private vehiculeList: Vehicle[] = []
  save (data: Vehicle): void {
    this.vehiculeList.push(data)
  }

  delete (id: string): void {
    this.vehiculeList = this.vehiculeList.filter(vehicule => vehicule.getId() !== id)
  }

  update (data: Vehicle): void {
    const index = this.vehiculeList.findIndex(vehicule => vehicule.getId() === data.getId())
    if (index !== -1) {
      this.vehiculeList[index] = data
    }
  }

  findById (id: string): Vehicle | undefined {
    return this.vehiculeList.find(vehicule => vehicule.getId() === id)
  }
}
