
export class SuscriptionPlan {
  private idPlan: string
  private name: string
  private monthlyFee: number

  constructor (idPlan: string, name: string, monthlyFee: number) {
    this.idPlan = idPlan
    this.name = name
    this.monthlyFee = monthlyFee
  }

  setIdPlan (idPlan: string): void { this.idPlan = idPlan }
  setName (name: string): void { this.name = name }
  SetPricing (princig: number): void { this.monthlyFee = princig }

  getPricing (): number { return this.monthlyFee }
  getName (): string { return this.name }
  getIdPlan (): string { return this.idPlan }
}
