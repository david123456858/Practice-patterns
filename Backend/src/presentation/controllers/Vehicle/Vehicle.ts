import { NextFunction, Request, Response } from 'express'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { ServiceVehicle } from '../../../application/use-cases/Vehicle/caseUseVehicle'

export class VehicleController {
  private readonly Service: IServicesOperations

  constructor (Service: ServiceVehicle) {
    this.Service = Service

    this.create = this.create.bind(this)
    this.getVehicle = this.getVehicle.bind(this)
    this.getVehicleById = this.getVehicleById.bind(this)
    this.getVehicleAvaibleByStation = this.getVehicleAvaibleByStation.bind(this)
    this.getVehicleAvaible = this.getVehicleAvaible.bind(this)
  }

  async create (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.Service.create(body)

    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicle (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const result = await this.Service.getAll()

    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicleById (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.Service.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicleAvaibleByStation (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.Service.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicleAvaible (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.Service.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
