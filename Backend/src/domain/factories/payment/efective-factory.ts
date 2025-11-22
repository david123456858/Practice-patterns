import { Payment } from '../../entities/Payment/payment'
import { IPaymentProcessor } from '../../interfaces/specific/Payment/payment'
import { PaymentStatus } from '../../types/Payment/PaymentStatus'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CashPaymentProcessor implements IPaymentProcessor {
  doPay (payment: Payment): any {
    setTimeout(() => {
      console.log('Processing cash payment...')
    }, 5000)

    payment.setStatus(PaymentStatus.COMPLETED)
    return payment
  }
}
