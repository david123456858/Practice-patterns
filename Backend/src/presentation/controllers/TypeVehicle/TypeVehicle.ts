import { NextFunction, Request, Response } from 'express'

import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { ServiceTypeVehicle } from '../../../application/use-cases/TypeVehicle/caseUseTypeVehicle'

export class ControllerTypeVehicle {
  private readonly ServiceTypeVehicle: IServicesOperations

  constructor (service: ServiceTypeVehicle) {
    this.ServiceTypeVehicle = service

    this.createTypeVehicle = this.createTypeVehicle.bind(this)
    this.getTypeVehicle = this.getTypeVehicle.bind(this)
    this.getTypeVehicleId = this.getTypeVehicleId.bind(this)
  }

  async createTypeVehicle (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.ServiceTypeVehicle.create(body)
    if (!result.success) {
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }

  async getTypeVehicle (_req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.ServiceTypeVehicle.getAll()
    if (!result.success) {
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }

  async getTypeVehicleId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.ServiceTypeVehicle.getById(id)
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
