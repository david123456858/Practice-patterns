import { GeoLocation } from '../../../domain/entities/GeoLocation/GeoLocation'
import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

let stationList: Station[] = [
  new Station('1', 'Sede Don carmelo', 'Calle 14 45-5', new GeoLocation(1.2151, 244.5423232)),
  new Station('2', 'Universidad Popular', 'Diagonal 21 n.º 29-56', new GeoLocation(10.47412, -73.25129))]

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
