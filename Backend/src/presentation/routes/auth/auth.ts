import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { AuthController } from '../../controllers/Auth/auth'
import { AuthService } from '../../../application/use-cases/Auth/caseUseAuth'
import { UserRepository } from '../../../infrastructure/repositories/User/repository'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { UserDtoAuth } from '../../../domain/dtos/User/auth'
import { UserDtoCreate } from '../../../domain/dtos/User/createDto'

export const routeAuth = (prefix: string): Router => {
  const repository = new UserRepository()
  const service = new AuthService(repository)
  const controller = new AuthController(service)

  route.post(`${prefix}`, validateDto(UserDtoAuth), controller.autenticate)
  route.post(`${prefix}/register`, validateDto(UserDtoCreate), controller.register)

  return route
}
