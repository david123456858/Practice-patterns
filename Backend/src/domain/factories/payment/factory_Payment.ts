import { IPaymentProcessor } from '../../interfaces/specific/Payment/payment'
import { PaymentMethod } from '../../types/Payment/PaymentMethod'
import { CashPaymentProcessor } from './efective-factory'

export class PaymentProcessorFactory {
  private readonly methods: Map<string, IPaymentProcessor>
  constructor () {
    this.methods = new Map([
      ['EFECTIVE', new CashPaymentProcessor()]])
  }

  public createPaymentMehod (methods: PaymentMethod): IPaymentProcessor {
    const paymethod = this.methods.get(methods)
    if (paymethod == null) {
      throw new Error('Payment method not found')
    }
    return paymethod
  }
}
