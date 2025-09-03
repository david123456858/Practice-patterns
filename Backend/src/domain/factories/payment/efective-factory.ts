import { PaymentEfective } from '../../entities/Payment/payment'
import { Payment } from '../../interfaces/specific/Payment/payment'
import { PaymentFactory } from './factory_Payment'

export class EfectivePayment extends PaymentFactory {
  public createProcessor (): Payment {
    return new PaymentEfective()
  }
}
