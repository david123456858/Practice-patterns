import { GeoLocation } from '../GeoLocation/GeoLocation'

export class Station {
  private id: string
  private name: string
  private address: string
  private readonly geoLocation: GeoLocation

  constructor (id: string, name: string, address: string, geoLocation: GeoLocation) {
    this.id = id
    this.name = name
    this.address = address
    this.geoLocation = geoLocation
  }

  getId (): string {
    return this.id
  }

  setId (id: string): void {
    this.id = id
  }

  getName (): string {
    return this.name
  }

  setName (name: string): void {
    this.name = name
  }

  getAdress (): string {
    return this.address
  }

  setAdress (address: string): void {
    this.address = address
  }

  getGeoLocation (): GeoLocation {
    return this.geoLocation
  }

  setGeoLocation (latitude: number, longitude: number): void {
    this.geoLocation.setLocation(latitude, longitude)
  }
}
