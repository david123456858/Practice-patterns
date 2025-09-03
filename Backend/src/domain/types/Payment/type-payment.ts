import { EfectivePayment } from '../../factories/payment/efective-factory'

export const mapTypePaymeny = new Map([
  ['efective', new EfectivePayment()]
])

export type payments = 'efective' | 'credit-card'
