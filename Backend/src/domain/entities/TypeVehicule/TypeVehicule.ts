export class TypeVehicule {
  private name: string
  private costForDuration: number

  constructor (name: string, costForDuration: number) {
    this.name = name
    this.costForDuration = costForDuration

    this.getName = this.getName.bind(this)
  }

  setName (name: string): void {
    this.name = name
  }

  getName (): string {
    return this.name
  }

  getCostForDuration (): number {
    return this.costForDuration
  }

  setCostForDuration (costForDuration: number): void {
    this.costForDuration = costForDuration
  }
}
