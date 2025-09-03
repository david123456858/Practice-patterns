import { NextFunction, Request, Response } from 'express'
import { ServiceLoan } from '../../../application/use-cases/Loan/caseUseLoan'

export class LoanController {
  private readonly serviceLoan: ServiceLoan

  constructor (service: ServiceLoan) {
    this.serviceLoan = service

    this.createLoan = this.createLoan.bind(this)
    this.getLoan = this.getLoan.bind(this)
    this.getLoanId = this.getLoanId.bind(this)
    this.returnVehicleLoaned = this.returnVehicleLoaned.bind(this)
    this.payLoan = this.payLoan.bind(this)
  }

  async createLoan (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.serviceLoan.create(body)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getLoan (_req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.serviceLoan.getAll()
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getLoanId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.serviceLoan.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async returnVehicleLoaned (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    console.log('controlador', id)

    const result = await this.serviceLoan.returnVehicleLoaned(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async payLoan (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.serviceLoan.payOfLoan(body)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
