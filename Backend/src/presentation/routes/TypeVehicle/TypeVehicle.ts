import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createTypeVehicleDto } from '../../../domain/dtos/typeVehicle/create'
import { RepositoryTypeVehicule } from '../../../infrastructure/repositories/TypeVehicule/TypesVehicule'
import { ServiceTypeVehicle } from '../../../application/use-cases/TypeVehicle/caseUseTypeVehicle'
import { ControllerTypeVehicle } from '../../controllers/TypeVehicle/TypeVehicle'

export const routeTypeVehicle = (prefix: string): Router => {
  const respositoty = new RepositoryTypeVehicule()
  const service = new ServiceTypeVehicle(respositoty)
  const controller = new ControllerTypeVehicle(service)

  route.post(`${prefix}`, validateDto(createTypeVehicleDto), controller.createTypeVehicle)
  route.get(`${prefix}`, controller.getTypeVehicle)
  route.get(`${prefix}/:id`, controller.getTypeVehicleId)

  return route
}
