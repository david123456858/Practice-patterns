/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PaymentFactory } from '../../../domain/factories/payment/factory_Payment'
import { mapTypePaymeny, payments } from '../../../domain/types/Payment/type-payment'

export class ServicePayment {
  private payProcessor !: PaymentFactory
  doPay (amount: number, amountForPay: number, type: payments): any {
    const factory = mapTypePaymeny.get(type)
    if (!factory) {
      return false
    }
    this.payProcessor = factory

    const proccess = this.payProcessor.getPaymentProccessor()

    return proccess.doPay(amount, amountForPay)
  }
}
