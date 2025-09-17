import { PaymentStatus } from '../../types/Payment/PaymentStatus'

export class Payment {
  private readonly paymentId: string
  private readonly loanId: string
  private amount: number
  private status: PaymentStatus
  private paymentDate: Date

  constructor (paymentId: string, loanId: string, amount: number, Status: PaymentStatus, paymentDate: Date) {
    this.paymentId = paymentId
    this.loanId = loanId
    this.amount = amount
    this.status = Status
    this.paymentDate = paymentDate
  }

  // Getters
  getPaymentId (): string { return this.paymentId }
  getLoanId (): string { return this.loanId }
  getAmount (): number { return this.amount }
  getStatus (): string { return this.status }
  getPaymentDate (): Date { return this.paymentDate }
  // Setters
  setAmount (amount: number): void { this.amount = amount }
  setStatus (status: PaymentStatus): void { this.status = status }
  setPaymentDate (paymentDate: Date): void { this.paymentDate = paymentDate }
}
