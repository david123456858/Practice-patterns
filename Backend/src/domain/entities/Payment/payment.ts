import { PaymentMethod } from '../../types/Payment/PaymentMethod'
import { PaymentStatus } from '../../types/Payment/PaymentStatus'

export class Payment {
  private readonly paymentId: string
  private readonly loanId: string
  private amount: number
  private status: PaymentStatus
  private paymethod: PaymentMethod
  private paymentDate: Date

  constructor (paymentId: string, loanId: string, amount: number, Status: PaymentStatus, paymethod: PaymentMethod, paymentDate: Date) {
    this.paymentId = paymentId
    this.loanId = loanId
    this.amount = amount
    this.status = Status
    this.paymethod = paymethod
    this.paymentDate = paymentDate
  }

  // Getters
  getPaymentId (): string { return this.paymentId }
  getLoanId (): string { return this.loanId }
  getAmount (): number { return this.amount }
  getStatus (): string { return this.status }
  getPaymentDate (): Date { return this.paymentDate }
  getPaymethod (): string { return this.paymethod }
  // Setters
  setAmount (amount: number): void { this.amount = amount }
  setStatus (status: PaymentStatus): void { this.status = status }
  setPaymentDate (paymentDate: Date): void { this.paymentDate = paymentDate }
  setPaymethod (paymethod: PaymentMethod): void { this.paymethod = paymethod }
}
