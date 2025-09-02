import { TypeVehicule } from './../TypeVehicule/TypeVehicule'
import { StatusVehicule } from '../../types/Vehicule/VehiculeEnum'
import { GeoLocation } from '../GeoLocation/GeoLocation'

export class Vehicle extends TypeVehicule {
  private id: string
  private idStation: string
  private readonly currentLoca: GeoLocation
  private status: StatusVehicule

  constructor (
    id: string,
    idStation: string,
    currentLoca: GeoLocation,
    status: StatusVehicule,
    typeVehicule: TypeVehicule) {
    super(typeVehicule.getName(), typeVehicule.getCostForDuration())
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

  getStatus (): StatusVehicule {
    return this.status
  }

  setStatus (statusVehicule: StatusVehicule): void {
    this.status = statusVehicule
  }
}
