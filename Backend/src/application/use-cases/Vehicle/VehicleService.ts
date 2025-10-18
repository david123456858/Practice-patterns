/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { ISuccessProcess, IFailureProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'
import { VehicleDtoEspefic } from '../../../domain/dtos/Vehicle/create'
import { ProviderVehicle } from '../../../domain/factories/providers/Vehicle'

export class VehicleService implements IServicesOperations {
  private readonly providerFactory: ProviderVehicle
  constructor (private readonly vehicleRepository: RepositoryVehicule, private readonly stationRepository: repositoryStation) {
    this.providerFactory = ProviderVehicle.getInstance()
  }

  async delete (
    id: string
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async update (
    id: string,
    data: any
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async create (
    data: VehicleDtoEspefic
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      console.log(data)
      console.log(data.getStation().getIdStation())

      // const existingStation = await this.stationRepository.findById(
      //   data.getStation().getIdStation()
      // )
      // if (!existingStation) return FailureProccess('Not exit Station', 400)

      const exitingVehicle = this.vehicleRepository.findById(data.idVehicle)
      if (exitingVehicle) return FailureProccess('this vehicle exiting', 400)

      const factory = this.providerFactory.getFactory(data.getVehicleType())
      const vehicle = factory.createVehicleMecacnic(data)

      // this.vehicleRepository.save(vehicle)

      console.log(vehicle)

      return SuccessProcess('vehicle created successfully', 200)
    } catch (error) {
      console.log(error)
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = this.vehicleRepository.findAll()
      // const stations = this.stationRepository.findAll()

      // const resultClean = result.map((vehicle) => {
      //   const station = stations.find(
      //     (s) => s.getId() === vehicle.getIdStation()
      //   )
      //   return {
      //     ...vehicle,
      //     nameStation: station?.getName()
      //   }
      // })
      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getById (
    id: string
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
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
      // const stations = this.stationRepository.findAll()

      // const resultClean = result.map((vehicle) => {
      //   const station = stations.find(
      //     (s) => s.getId() === vehicle.getIdStation()
      //   )
      //   return {
      //     ...vehicle,
      //     nameStation: station?.getName()
      //   }
      // })
      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAvailableByStation (
    stationId: string
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const resultVehicleAvailable =
        this.vehicleRepository.findByStationAvailable(stationId)
      return SuccessProcess(resultVehicleAvailable, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }
}
