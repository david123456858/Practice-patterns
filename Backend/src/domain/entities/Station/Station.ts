import { GeoLocation } from '../GeoLocation/GeoLocation'

export class Station {
  private idStation: string
  private name: string
  private address: string
  private readonly geoLocation: GeoLocation

  constructor (idStation: string, name: string, address: string, geoLocation: GeoLocation) {
    this.idStation = idStation
    this.name = name
    this.address = address
    this.geoLocation = geoLocation
  }

  getId (): string {
    return this.idStation
  }

  setId (idStation: string): void {
    this.idStation = idStation
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
