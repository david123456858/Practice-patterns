import { payments } from '../../types/Payment/type-payment'

export class HistoryLoan {
  id: string
  idUser: string
  idVehicle: string
  idStationOrigin: string
  idStationDestine: String
  typePay: payments
  amount: number
  constructor (id: string,
    idUser: string,
    idVehicle: string,
    idStationOrigin: string,
    idStationDestine: String,
    typePay: payments,
    amount: number) {
    this.id = id
    this.idUser = idUser
    this.idVehicle = idVehicle
    this.idStationOrigin = idStationOrigin
    this.idStationDestine = idStationDestine
    this.typePay = typePay
    this.amount = amount
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
    this.idStationDestine = idStationDestination
  }

  setIdVehicle (idVehicle: string): void {
    this.idVehicle = idVehicle
  }

  getIdVehicle (): string {
    return this.idVehicle
  }

  getTypePayment (): payments {
    return this.typePay
  }

  setTypePayment (type: payments): void {
    this.typePay = type
  }

  getAmount (): number {
    return this.amount
  }

  setAmount (amount: number): void {
    this.amount = amount
  }
}
