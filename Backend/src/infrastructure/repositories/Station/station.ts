import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

export class repositoryStation implements ICrudOperations<Station> {
  private stationList: Station[] = []
  save (data: Station): void {
    this.stationList.push(data)
  }

  delete (id: string): void {
    this.stationList = this.stationList.filter(station => station.getId() !== id)
  }

  update (data: Station): void {
    const index = this.stationList.findIndex(station => station.getId() === data.getId())
    if (index !== -1) {
      this.stationList[index] = data
    }
  }

  findById (id: string): any {
    return this.stationList.find(station => station.getId() === id)
  }

  findAll (): Station[] {
    return this.stationList
  }
}
