
import { StatusVehicle } from '../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../GeoLocation/GeoLocation'

export class Vehicle {
  private id: string
  private idStation: string
  private readonly currentLoca: GeoLocation
  private status: StatusVehicle

  constructor (
    id: string,
    idStation: string,
    currentLoca: GeoLocation,
    status: StatusVehicle
  ) {
    this.id = id
    this.idStation = idStation
    this.currentLoca = currentLoca
    this.status = status
  }

  getId (): string {
    return this.id
  }

  setId (id: string): void {
    this.id = id
  }

  getIdStation (): string {
    return this.idStation
  }

  setIdStation (idStation: string): void {
    this.idStation = idStation
  }

  getCurrentLoca (): GeoLocation {
    return this.currentLoca
  }

  setCurrectLoca (latitude: number, longitude: number): void {
    this.currentLoca.setLocation(latitude, longitude)
  }

  getStatus (): StatusVehicle {
    return this.status
  }

  setStatus (StatusVehicle: StatusVehicle): void {
    this.status = StatusVehicle
  }
}
