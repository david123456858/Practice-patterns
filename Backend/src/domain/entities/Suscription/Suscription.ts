import { TypesPricePeriods } from './../../types/Suscription/Suscription'

export class Suscription {
  private pricing: number
  private TypesPricePeriods: TypesPricePeriods

  constructor (pricing: number, TypesPricePeriods: TypesPricePeriods) {
    this.pricing = pricing
    this.TypesPricePeriods = TypesPricePeriods
  }

  SetPricing (princig: number): void {
    this.pricing = princig
  }

  getPricing (): number {
    return this.pricing
  }

  getTypePricePeriods (): TypesPricePeriods {
    return this.TypesPricePeriods
  }

  setTypesPricePeriods (types: TypesPricePeriods): void {
    this.TypesPricePeriods = types
  }
}
