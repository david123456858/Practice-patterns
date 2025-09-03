import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

let stationList: Station[] = []

export class repositoryStation implements ICrudOperations<Station> {
  save (data: Station): void {
    stationList.push(data)
  }

  delete (id: string): void {
    stationList = stationList.filter(station => station.getId() !== id)
  }

  update (data: Station): void {
    const index = stationList.findIndex(station => station.getId() === data.getId())
    if (index !== -1) {
      stationList[index] = data
    }
  }

  findById (id: string): any {
    return stationList.find(station => station.getId() === id)
  }

  findAll (): Station[] {
    return stationList
  }
}
