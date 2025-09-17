import { NextFunction, Request, Response } from 'express'
import { VehicleService } from '../../../application/use-cases/Vehicle/VehicleService'
import { VehicleType } from '../../../domain/types/Vehicule/VehiculeEnum'

export class VehicleController {
  private readonly Service: VehicleService

  constructor (Service: VehicleService) {
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

  async getVehicleTypes (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const result = VehicleType

    res.status(200).json({ message: result })
  }

  async getVehicleAvaibleByStation (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.Service.getAvailableByStation(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicleAvaible (req: Request, res: Response, Next: NextFunction): Promise<void> {
    const result = await this.Service.getAvailable()
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
