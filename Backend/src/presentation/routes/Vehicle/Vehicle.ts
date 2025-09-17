import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { CreateBicycleDto, CreateCarElectricDto, CreateElectricScooterDto, CreateSkateboardDto } from '../../../domain/dtos/Vehicle/create'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { VehicleService } from '../../../application/use-cases/Vehicle/VehicleService'
import { VehicleController } from '../../controllers/Vehicle/Vehicle'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'

export const routeVehicle = (prefix: string): Router => {
  const repositoryVehicle = new RepositoryVehicule()
  const repostoryStation = new repositoryStation()

  const service = new VehicleService(repositoryVehicle, repostoryStation)

  const controller = new VehicleController(service)

  route.post(`${prefix}/bicycle`, validateDto(CreateBicycleDto), controller.create)
  route.post(`${prefix}/scooter`, validateDto(CreateElectricScooterDto), controller.create)
  route.post(`${prefix}/skateboard`, validateDto(CreateSkateboardDto), controller.create)
  route.post(`${prefix}/car`, validateDto(CreateCarElectricDto), controller.create)

  route.get(`${prefix}`, controller.getVehicle)
  route.get(`${prefix}/available`, controller.getVehicleAvaible)
  route.get(`${prefix}/types`, controller.getVehicleTypes)
  route.get(`${prefix}/station/:id/available`, controller.getVehicleAvaibleByStation)

  return route
}
