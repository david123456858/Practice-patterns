/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Suscription } from './Suscription'
import { TypesPricePeriods } from './../../types/Suscription/Suscription'

export class Premium extends Suscription {
  constructor (pricing: number, TypesPricePeriods: TypesPricePeriods) {
    super(pricing, TypesPricePeriods)
  }
}
