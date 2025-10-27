/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { ISuccessProcess, IFailureProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { RepositoryStation } from '../../../infrastructure/repositories/Station/station'
import { VehicleDtoEspefic } from '../../../domain/dtos/Vehicle/create'
import { ProviderVehicle } from '../../../domain/factories/providers/Vehicle'
import { StatusVehicle } from '../../../domain/types/Vehicule/VehiculeEnum'
import 'dotenv/config'

export class VehicleService implements IServicesOperations {
  private readonly providerFactory: ProviderVehicle
  constructor (private readonly vehicleRepository: RepositoryVehicule, private readonly stationRepository: RepositoryStation) {
    this.providerFactory = ProviderVehicle.getInstance()
  }

  async delete (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const vehicleResult = await this.vehicleRepository.findById(id)
      const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult
      if (!vehicle) return FailureProccess('Vehicle not found', 404)

      await this.vehicleRepository.delete(id)
      return SuccessProcess('Vehicle deleted successfully', 200)
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      return FailureProccess('Internal server error', 500)
    }
  }

  async update (id: string, data: any): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const vehicleResult = await this.vehicleRepository.findById(id)
      const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult
      if (!vehicle) return FailureProccess('Vehicle not found', 404)

      // Actualizar los campos permitidos
      Object.assign(vehicle, data)
      await this.vehicleRepository.update(vehicle)

      return SuccessProcess('Vehicle updated successfully', 200)
    } catch (error) {
      console.error('Error updating vehicle:', error)
      return FailureProccess('Internal server error', 500)
    }
  }

  async create (
    data: VehicleDtoEspefic
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const existingStation = await this.stationRepository.findById(data.getStation().getIdStation())
      if (!existingStation) return FailureProccess('Station not found', 404)

      // Validar si el vehículo ya existe
      const existingVehicleResult = await this.vehicleRepository.findById(data.idVehicle)

      if (existingVehicleResult.length > 1) return FailureProccess('Vehicle already exists', 400)

      const factory = this.providerFactory.getFactory(data.getVehicleType())

      const vehicle = factory.createVehicleMecacnic(data)

      await this.vehicleRepository.save(vehicle)

      return SuccessProcess('vehicle created successfully', 200)
    } catch (error) {
      console.log(error)
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.vehicleRepository.findAll()
      const infoComplete = await Promise.all(result.map(async (vehicle) => {
        const image = await this.fetchImageUrl(vehicle.idVehicle)
        return { ...vehicle, image }
      }))
      return SuccessProcess(infoComplete, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getById (
    id: string
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.vehicleRepository.findById(id)
      const vehicle = Array.isArray(result) ? result[0] : result
      if (!result) return FailureProccess('Not exit vehicle', 400)

      return SuccessProcess(vehicle, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAvailable (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.vehicleRepository.findByAvailable()
      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async getAvailableByStation (
    stationId: string
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.vehicleRepository.findByStationAvailable(stationId)
      const available = result.filter(v => v.state === StatusVehicle.AVAILABLE)
      return SuccessProcess(available, 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async fetchImageUrl (vehicle: string): Promise<string[]> {
    try {
      const response = await fetch(`${process.env.URL_IMAGES!}/api/images/vehicle/${vehicle}`)

      if (!response.ok) return ['https://example.com/default-image.jpg']
      const data = await response.json()
      return data.message.images
    } catch {
      return ['https://example.com/default-image.jpg']
    }
  }
}
