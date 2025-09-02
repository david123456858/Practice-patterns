import { Router } from 'express'
import config from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { ServiceUser } from '../../../application/use-cases/User/ServiceUser'
import { UserRepository } from '../../../infrastructure/repositories/User/repository'
import { UserController } from '../../controllers/User/User'

export const routerUser = (prefix: string): Router => {
  const repositoty = new UserRepository()
  const service = new ServiceUser(repositoty)
  const controller = new UserController(service)

  config.route.post(`${prefix}`, validateDto, controller.createUser)
  config.route.get(`${prefix}`, () => {})
  config.route.get(`${prefix}/:id`, () => {})

  return config.route
}
