import { ServicePayment } from '../../../application/use-cases/Payment/payment'
export class PaymentController {
  constructor (private readonly service: ServicePayment) {
    this.paymentCreate = this.paymentCreate.bind(this)
  }

  async paymentCreate (req: any, res: any): Promise<void> {
    const payment = req.body

    const result = await this.service.PaymentStatus(payment)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
