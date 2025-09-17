import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createPaymentDto } from '../../../domain/dtos/payment/create'
import { PaymentRepository } from '../../../infrastructure/repositories/payment/payment'
import { ServicePayment } from '../../../application/use-cases/Payment/payment'
import { PaymentController } from '../../controllers/payment/payment'
export const paymentRoute = (prefix: string): Router => {
  const repository = new PaymentRepository()
  const service = new ServicePayment(repository)
  const controller = new PaymentController(service)

  route.post(`${prefix}`, validateDto(createPaymentDto), controller.paymentCreate)
  route.get(`${prefix}`, controller.getPaymentType)
  //   route.get(`${prefix}/:id`)

  return route
}
