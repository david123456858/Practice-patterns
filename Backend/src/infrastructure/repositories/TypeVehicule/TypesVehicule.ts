import { TypeVehicule } from '../../../domain/entities/TypeVehicule/TypeVehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
let TypeVehiculeList: TypeVehicule[] = [new TypeVehicule('bicicletas', 100), new TypeVehicule('patinetas', 500)]

export class RepositoryTypeVehicule implements ICrudOperations<TypeVehicule> {
  delete (id: string): void {
    TypeVehiculeList = TypeVehiculeList.filter(type => type.getName() !== id)
  }

  save (data: TypeVehicule): void {
    TypeVehiculeList.push(data)
  }

  update (data: TypeVehicule): void {
    const index = TypeVehiculeList.findIndex(type => type.getName() === data.getName())
    TypeVehiculeList[index] = data
  }

  findById (id: string): TypeVehicule | undefined {
    return TypeVehiculeList.find(type => type.getName() === id)
  }

  findAll (): TypeVehicule[] {
    return TypeVehiculeList
  }
}
