import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createVehicleDto } from '../../../domain/dtos/Vehicle/create'
import { RepositoryTypeVehicule } from '../../../infrastructure/repositories/TypeVehicule/TypesVehicule'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { ServiceVehicle } from '../../../application/use-cases/Vehicle/caseUseVehicle'
import { VehicleController } from '../../controllers/Vehicle/Vehicle'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'

export const routeVehicle = (prefix: string): Router => {
  const repositoryTypeVehicle = new RepositoryTypeVehicule()
  const repositoryVehicle = new RepositoryVehicule()
  const repostoryStation = new repositoryStation()

  const service = new ServiceVehicle(repositoryVehicle, repositoryTypeVehicle, repostoryStation)

  const controller = new VehicleController(service)

  route.post(`${prefix}`, validateDto(createVehicleDto), controller.create)
  route.get(`${prefix}`, controller.getVehicle)
  route.get(`${prefix}/:id`, controller.getVehicle)

  return route
}
