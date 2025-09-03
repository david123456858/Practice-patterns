import { TypeVehicule } from '../../../domain/entities/TypeVehicule/TypeVehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

export class RepositoryTypeVehicule implements ICrudOperations<TypeVehicule> {
  private TypeVehiculeList: TypeVehicule[] = [new TypeVehicule('bicicletas', 100), new TypeVehicule('patinetas', 500)]

  delete (id: string): void {
    this.TypeVehiculeList = this.TypeVehiculeList.filter(type => type.getName() !== id)
  }

  save (data: TypeVehicule): void {
    this.TypeVehiculeList.push(data)
  }

  update (data: TypeVehicule): void {
    const index = this.TypeVehiculeList.findIndex(type => type.getName() === data.getName())
    this.TypeVehiculeList[index] = data
  }

  findById (id: string): TypeVehicule | undefined {
    return this.TypeVehiculeList.find(type => type.getName() === id)
  }

  findAll (): TypeVehicule[] {
    return this.TypeVehiculeList
  }
}
