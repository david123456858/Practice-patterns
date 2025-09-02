import { NextFunction, Request, Response } from 'express'
import { ServiceStation } from '../../../application/use-cases/Station/caseUseStation'

export class ControllerStation {
  private readonly serviceStation: ServiceStation

  constructor (service: ServiceStation) {
    this.serviceStation = service
  }

  async createUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.serviceStation.create(body)
    if (!result.success) {
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }

  async getUsers (_req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.serviceStation.getAll()
    if (!result.success) {
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }

  async getUsersId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.serviceStation.getById(id)
    if (!result.success) {
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }
}
