/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { VehicleFactory } from './../../../domain/factories/vehicle/VehicleFactory'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { ISuccessProcess, IFailureProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'
import { CreateVehicleDto } from '../../../domain/dtos/Vehicle/create'

export class VehicleService implements IServicesOperations {
  constructor (private readonly vehicleRepository: RepositoryVehicule, private readonly stationRepository: repositoryStation) {}

  async delete (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async update (id: string, data: any): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async create (data: CreateVehicleDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const existingStation = await this.stationRepository.findById(data.idStation)
      if (!existingStation) return FailureProccess('Not exit Station', 400)

      const exitingVehicle = this.vehicleRepository.findById(data.idVehicle)
      if (exitingVehicle) return FailureProccess('this vehicle exiting', 400)

      const vehicle = VehicleFactory.createVehicle(data)
      this.vehicleRepository.save(vehicle)

      return SuccessProcess('vehicle created successfully', 200)
    } catch (error) {
      console.log(error)
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = this.vehicleRepository.findAll()
      const stations = this.stationRepository.findAll()

      const resultClean = result.map(vehicle => {
        const station = stations.find(s => s.getId() === vehicle.getIdStation())
        return {
          ...vehicle,
          nameStation: station?.getName()
        }
      })
      return SuccessProcess(resultClean, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = this.vehicleRepository.findById(id)
      if (!result) return FailureProccess('Not exit vehicle', 400)

      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAvailable (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = this.vehicleRepository.findByAvailable()
      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAvailableByStation (stationId: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const resultVehicleAvailable = this.vehicleRepository.findByStationAvailable(stationId)
      return SuccessProcess(resultVehicleAvailable, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }
}
