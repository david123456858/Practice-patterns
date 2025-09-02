import { Suscription } from './../Suscription/Suscription'

export class User {
  private cc: string
  private name: string
  private email: string
  private suscription: Suscription | any

  constructor (cc: string, name: string, email: string, suscription?: Suscription) {
    this.cc = cc
    this.email = email
    this.name = name
    this.suscription = suscription ?? null
  }

  setCC (cc: string): void {
    this.cc = cc
  }

  getCC (): string {
    return this.cc
  }

  setName (name: string): void {
    this.name = name
  }

  getName (): string {
    return this.name
  }

  setEmail (email: string): void {
    this.email = email
  }

  getEmail (): string {
    return this.email
  }

  setSuscription (suscription: Suscription): void {
    this.suscription = suscription
  }

  getSuscription (): Suscription {
    return this.suscription
  }
}
