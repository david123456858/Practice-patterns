/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createTypeVehicleDto } from '../../../domain/dtos/typeVehicle/create'
import { TypeVehicule } from '../../../domain/entities/TypeVehicule/TypeVehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceTypeVehicle implements IServicesOperations {
  private readonly userRepository: ICrudOperations<TypeVehicule>
  constructor (userRepository: ICrudOperations<TypeVehicule>) {
    this.userRepository = userRepository
  }

  async create (typeVehicleDto: createTypeVehicleDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findStation = this.userRepository.findById(typeVehicleDto.name)
      if (findStation) {
        return FailureProccess('User already exists', 400)
      }
      const type = new TypeVehicule(
        typeVehicleDto.name,
        typeVehicleDto.costForDuration
      )

      this.userRepository.save(type)
      return SuccessProcess('User created successfully', 201)
    } catch (error) {
      return FailureProccess('Error creating user', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const station = this.userRepository.findById(id)
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
      const users = this.userRepository.findAll()
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
