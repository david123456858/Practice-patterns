import { Payment } from '../../../entities/Payment/payment'

export interface IPaymentProcessor {
  doPay: (payment: Payment) => any
}
