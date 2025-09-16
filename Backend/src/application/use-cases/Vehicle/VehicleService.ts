import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
// import { Vehicle } from '../../../domain/entities/Vehicule/Vehicle'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
// import { CreateVehicleDto, CreateBicycleDto, CreateElectricScooterDto, CreateCarElectricDto } from '../../../domain/dtos/Vehicle/create'
import { ISuccessProcess, IFailureProcess } from '../../../domain/interfaces/common/IResults'

// import { Bicycle } from '../../../domain/entities/Vehicule/Bicycle'
// import { ElectricScooter } from '../../../domain/entities/Vehicule/ElectricScooter'
// import { CarElectric } from '../../../domain/entities/Vehicule/CarElectric'
// import { Battery } from '../../../domain/entities/Battery/Battery'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class VehicleService implements IServicesOperations {
  constructor (private readonly vehicleRepository: RepositoryVehicule) {}
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

  async create (data: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async getAvailableByStation (stationId: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
