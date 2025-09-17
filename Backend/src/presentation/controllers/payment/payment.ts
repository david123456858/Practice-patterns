import { Request, Response } from 'express'
import { ServicePayment } from '../../../application/use-cases/Payment/payment'
import { PaymentMethod } from '../../../domain/types/Payment/PaymentMethod'
export class PaymentController {
  constructor (private readonly service: ServicePayment) {
    this.paymentCreate = this.paymentCreate.bind(this)
  }

  async paymentCreate (req: Request, res: Response): Promise<void> {
    const payment = req.body

    const result = await this.service.PaymentStatus(payment)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getPaymentType (req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: PaymentMethod })
  }
}
