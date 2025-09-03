export class Loan {
  private id: string
  private idUser: string
  private idVehicle: string
  private idStationOrigin: string
  private idStationDestination: string
  private dateStart: Date
  constructor (id: string, idUser: string, idVehicule: string, idStationOrigin: string, idStationDestination: string, dateStart: Date) {
    this.id = id
    this.idUser = idUser
    this.idVehicle = idVehicule
    this.idStationOrigin = idStationOrigin
    this.idStationDestination = idStationDestination
    this.dateStart = dateStart
  }

  getId (): string {
    return this.id
  }

  setId (id: string): void {
    this.id = id
  }

  getIdUser (): string {
    return this.idUser
  }

  setIdUser (idUser: string): void {
    this.idUser = idUser
  }

  getIdStationOrigin (): string {
    return this.idStationOrigin
  }

  setIdStationOrigin (idStationOrigin: string): void {
    this.idStationOrigin = idStationOrigin
  }

  setIdStationDestination (idStationDestination: string): void {
    this.idStationDestination = idStationDestination
  }

  setDateStart (dateStart: Date): void {
    this.dateStart = dateStart
  }

  getDateStart (): Date {
    return this.dateStart
  }

  getIdStationDestination (): string {
    return this.idStationDestination
  }

  setIdVehicle (idVehicle: string): void {
    this.idVehicle = idVehicle
  }

  getIdVehicle (): string {
    return this.idVehicle
  }
}
