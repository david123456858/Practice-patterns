import { NextFunction, Request, Response } from 'express'
import { ServiceUser } from '../../../application/use-cases/User/ServiceUser'

export class UserController {
  private readonly userService: ServiceUser

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
      const error = {
        error: result.error,
        status: result.statusCode
      }
      return next(error)
    }
    res.status(result.statusCode).json({ message: result.value })
  }

  async getUsers (req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.getAll()
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
    const result = await this.userService.getById(id)
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
