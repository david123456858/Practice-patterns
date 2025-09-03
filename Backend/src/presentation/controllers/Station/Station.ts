import { NextFunction, Request, Response } from 'express'
import { ServiceStation } from '../../../application/use-cases/Station/caseUseStation'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'

export class StationController {
  private readonly serviceStation: IServicesOperations

  constructor (service: ServiceStation) {
    this.serviceStation = service

    this.createStation = this.createStation.bind(this)
    this.getStation = this.getStation.bind(this)
    this.getStationId = this.getStationId.bind(this)
  }

  async createStation (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.serviceStation.create(body)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getStation (_req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.serviceStation.getAll()
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getStationId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.serviceStation.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
