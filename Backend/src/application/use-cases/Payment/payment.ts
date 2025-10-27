import { Payment } from './../../../domain/entities/Payment/payment'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { createPaymentDto } from '../../../domain/dtos/payment/create'
import { PaymentProcessorFactory } from '../../../domain/factories/payment/factory_Payment'
import { PaymentRepository } from '../../../infrastructure/repositories/payment/payment'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { PaymentStatus } from '../../../domain/types/Payment/PaymentStatus'

export class ServicePayment {
  private readonly repositoryPayment: PaymentRepository
  private readonly factoryPayment: PaymentProcessorFactory
  constructor (repositoryPayment: PaymentRepository) {
    this.repositoryPayment = repositoryPayment
    this.factoryPayment = new PaymentProcessorFactory()
  }

  async PaymentStatus (payment: createPaymentDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const paymet = await this.repositoryPayment.findByLoanId(payment.loanId)
      if (!paymet) {
        return FailureProccess('payment not found', 404)
      }
      const onlypayment = paymet.find((index) => index.loanId === payment.loanId)

      const paymentInstance = new Payment(
        onlypayment.paymentId,
        onlypayment.loanId,
        onlypayment.amount,
        onlypayment.status,
        onlypayment.paymentMethod,
        new Date()
      )
      const paymentProccessor = this.factoryPayment.createPaymentMehod(payment.method)
      const paymentUpdated = await paymentProccessor.doPay(paymentInstance)

      await this.repositoryPayment.update(paymentUpdated)

      return SuccessProcess('payment processed successfully', 200)
    } catch (error) {
      console.log(error)

      return FailureProccess('Error processing payment', 500)
    }
  }

  public async paymentCreate (paymentDto: createPaymentDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const payment = new Payment(
        Math.random().toString(36).substring(2, 15), // paymentId,
        paymentDto.loanId,
        paymentDto.amount,
        PaymentStatus.PENDING, // Status
        paymentDto.method, // Status
        new Date()
      )
      console.log(payment)

      await this.repositoryPayment.save(payment)
      return SuccessProcess(payment, 201)
    } catch (error) {
      console.log(error)

      return FailureProccess('Error creating payment', 500)
    }
  }
}
