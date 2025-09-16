import { SuscriptionPlan } from './../Suscription/Suscription'

export class User {
  private idUser: string
  private name: string
  private lastName: string
  private email: string
  private suscription: SuscriptionPlan | any
  private password: string

  constructor (
    idUser: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    suscription?: SuscriptionPlan) {
    this.idUser = idUser
    this.email = email
    this.lastName = lastName
    this.name = name
    this.suscription = suscription ?? null
    this.password = password
  }

  setCC (idUser: string): void { this.idUser = idUser }
  setName (name: string): void { this.name = name }
  setLastName (lastName: string): void { this.lastName = lastName }
  setEmail (email: string): void { this.email = email }
  setSuscription (suscription: SuscriptionPlan): void { this.suscription = suscription }
  setPassword (password: string): void { this.password = password }

  getCC (): string { return this.idUser }
  getName (): string { return this.name }
  getLastName (): string { return this.lastName }
  getEmail (): string { return this.email }
  getSuscription (): SuscriptionPlan { return this.suscription }
  getPassword (): string { return this.password }
}
