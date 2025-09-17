import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { Payment } from '../../../domain/entities/Payment/payment'

let payments: Payment[] = []

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PaymentRepository implements ICrudOperations<Payment> {
  save (data: Payment): void {
    payments.push(data)
  }

  delete (id: string): void {
    payments = payments.filter(payment => payment.getPaymentId() !== id)
  }

  update (data: Payment): void {
    const index = payments.findIndex(payment => payment.getPaymentId() === data.getPaymentId())
    if (index !== -1) {
      payments[index] = data
    }
  }

  findById (id: string): any {
    return payments.find(payment => payment.getPaymentId() === id)
  }

  findByLoanId (loanId: string): any {
    return payments.find(pay => pay.getLoanId() === loanId)
  }

  findAll (): Payment[] {
    return payments
  }
}
