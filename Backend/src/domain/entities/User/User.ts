import { Loan } from '../Loan/Loan'
import { Role } from '../Role/Role'
import { SuscriptionPlan } from './../Suscription/Suscription'

export class User {
  private idUser: string
  private name: string
  private lastName: string
  private email: string
  private suscription: SuscriptionPlan | any
  private password: string
  private readonly role: Role[] = []
  private readonly loanHistory: Loan[] = []

  constructor (
    idUser: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: Role,
    suscription?: SuscriptionPlan
  ) {
    this.idUser = idUser
    this.email = email
    this.lastName = lastName
    this.name = name
    this.suscription = suscription ?? null
    this.password = password
    this.role.push(role)
  }

  setCC (idUser: string): void { this.idUser = idUser }
  setName (name: string): void { this.name = name }
  setLastName (lastName: string): void { this.lastName = lastName }
  setEmail (email: string): void { this.email = email }
  setSuscription (suscription: SuscriptionPlan): void { this.suscription = suscription }
  setPassword (password: string): void { this.password = password }
  setLoanHistory (loan: Loan): void { this.loanHistory.push(loan) }
  setRole (role: Role): void { this.role.push(role) }

  getCC (): string { return this.idUser }
  getName (): string { return this.name }
  getLastName (): string { return this.lastName }
  getEmail (): string { return this.email }
  getSuscription (): SuscriptionPlan { return this.suscription }
  getPassword (): string { return this.password }
  getRole (): Role[] { return this.role }
  getLoanHistory (): Loan[] { return this.loanHistory }
}
