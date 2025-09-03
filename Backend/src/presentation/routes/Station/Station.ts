import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createStationDto } from '../../../domain/dtos/Station/create'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'
import { ServiceStation } from '../../../application/use-cases/Station/caseUseStation'
import { ControllerStation } from '../../controllers/Station/Station'

export const routeStation = (prefix: string): Router => {
  const repository = new repositoryStation()
  const service = new ServiceStation(repository)
  const controller = new ControllerStation(service)

  route.post(`${prefix}`, validateDto(createStationDto), controller.createStation)
  route.get(`${prefix}`, controller.getStation)
  route.get(`${prefix}/:id`, controller.getStationId)
  return route
}
