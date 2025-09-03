import { NextFunction, Request, Response } from 'express'
import { ServiceUser } from '../../../application/use-cases/User/ServiceUser'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'

export class UserController {
  private readonly userService: IServicesOperations

  constructor (userService: ServiceUser) {
    this.userService = userService

    this.createUser = this.createUser.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getUsersId = this.getUsersId.bind(this)
  }

  async createUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const result = await this.userService.create(body)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getUsers (req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.getAll()
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getUsersId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.userService.getById(id)
    if (!result.success) {
      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }
}
