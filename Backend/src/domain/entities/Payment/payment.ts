import { Payment } from '../../interfaces/specific/Payment/payment'

export class PaymentEfective implements Payment {
  doPay (amount: number, amountForPay: number): any {
    const result = amount - amountForPay
    if (result < 0) {
      return false
    }
    return result
  }
}
