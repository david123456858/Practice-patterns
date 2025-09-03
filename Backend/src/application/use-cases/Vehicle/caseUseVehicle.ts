/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createVehicleDto } from '../../../domain/dtos/Vehicle/create'
import { Station } from '../../../domain/entities/Station/Station'
import { TypeVehicule } from '../../../domain/entities/TypeVehicule/TypeVehicule'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { StatusVehicule } from '../../../domain/types/Vehicule/VehiculeEnum'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceVehicle implements IServicesOperations {
  private readonly VehicleRepository: ICrudOperations<Vehicle>
  private readonly TypeVehicleRepostitory: ICrudOperations<TypeVehicule>
  private readonly StationRepository: ICrudOperations<Station>
  constructor (
    VehicleRepository: ICrudOperations<Vehicle>,
    TypeVehicleRepostitory: ICrudOperations<TypeVehicule>,
    StationRepository: ICrudOperations<Station>) {
    this.VehicleRepository = VehicleRepository
    this.TypeVehicleRepostitory = TypeVehicleRepostitory
    this.StationRepository = StationRepository
  }

  async create (VehicleDto: createVehicleDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findVehicle = this.VehicleRepository.findById(VehicleDto.id)
      if (findVehicle) return FailureProccess('Vehicle Exist Alredy', 400)
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const type = new TypeVehicule(VehicleDto.typeVehicule['name'], VehicleDto.typeVehicule['costForDuration'])

      const findTypeVehicle = this.TypeVehicleRepostitory.findById(type.getName())

      if (!findTypeVehicle) return FailureProccess('Not found type of Vehicle', 400)
      console.log(VehicleDto.idStation)

      const findStationCurrent = this.StationRepository.findById(VehicleDto.idStation)
      console.log(findStationCurrent)
      console.log(this.StationRepository.findAll())

      if (!findStationCurrent) return FailureProccess('Not found station', 400)

      const vehicle = new Vehicle(
        VehicleDto.id,
        VehicleDto.idStation,
        findStationCurrent.getGeoLocation(),
        StatusVehicule.AVAILABLE,
        type
      )
      this.VehicleRepository.save(vehicle)
      return SuccessProcess('Vehicle created successfully', 201)
    } catch (error) {
      console.log(error)

      return FailureProccess('Error creating Vehicle', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const station = this.VehicleRepository.findById(id)
      if (!station) {
        return FailureProccess('User not found', 404)
      }
      return SuccessProcess(station, 200)
    } catch (error) {
      return FailureProccess('Error fetching user', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const users = this.VehicleRepository.findAll()
      return SuccessProcess(users, 200)
    } catch (error) {
      return FailureProccess('Error fetching users', 500)
    }
  }

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
}
