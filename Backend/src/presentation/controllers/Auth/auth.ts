import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../../../application/use-cases/Auth/caseUseAuth'

export class AuthController {
  private readonly serviceAuth: AuthService
  constructor (service: AuthService) {
    this.serviceAuth = service
  }

  async autenticate (req: Request, res: Response, next: NextFunction): Promise<void> {
    const userLogin = req.body

    const response = await this.serviceAuth.authenticate(userLogin)

    if (!response.success) {
      res.status(response.status).json({ error: response.error })
      return
    }

    res.status(response.status).json({ message: response.value })
  }

  async register (req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.body
    const response = await this.serviceAuth.authenticate(user)

    if (!response.success) {
      res.status(response.status).json({ error: response.error })
      return
    }

    res.status(response.status).json({ message: response.value })
  }
}
