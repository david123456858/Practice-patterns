import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { AuthController } from '../../controllers/Auth/auth'
import { AuthService } from '../../../application/use-cases/Auth/caseUseAuth'
import { UserRepository } from '../../../infrastructure/repositories/User/repository'

export const routeAuth = (prefix: string): Router => {
  const repository = new UserRepository()
  const service = new AuthService(repository)
  const controller = new AuthController(service)

  route.post(`${prefix}/auth`, controller.autenticate)
  route.post(`${prefix}/register`, controller.register)

  return route
}
