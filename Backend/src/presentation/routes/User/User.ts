import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { ServiceUser } from '../../../application/use-cases/User/ServiceUser'
import { UserRepository } from '../../../infrastructure/repositories/User/repository'
import { UserController } from '../../controllers/User/User'
import { UserDtoCreate } from '../../../domain/dtos/User/createDto'

export const routerUser = (prefix: string): Router => {
  const repositoty = new UserRepository()
  const service = new ServiceUser(repositoty)
  const controller = new UserController(service)

  route.post(`${prefix}`, validateDto(UserDtoCreate), controller.createUser)
  route.get(`${prefix}`, controller.getUsers)
  route.get(`${prefix}/:id`, controller.getUsersId)

  return route
}
