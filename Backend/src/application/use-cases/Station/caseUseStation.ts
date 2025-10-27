/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createStationDto } from '../../../domain/dtos/Station/create'
import { GeoLocation } from '../../../domain/entities/GeoLocation/GeoLocation'
import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceStation implements IServicesOperations {
  private readonly userRepository: ICrudOperations<Station>
  constructor (userRepository: ICrudOperations<Station>) {
    this.userRepository = userRepository
  }

  async create (stationDto: createStationDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findStation = await this.userRepository.findById(stationDto.id)
      if (findStation) {
        return FailureProccess('Station already exists', 400)
      }
      const station = new Station(
        stationDto.id,
        stationDto.name,
        stationDto.address,
        new GeoLocation(
          stationDto.geoLocation.getLatitude(),
          stationDto.geoLocation.getLatitude())
      )
      this.userRepository.save(station)
      return SuccessProcess('Station created successfully', 201)
    } catch (error) {
      return FailureProccess('Error creating Station', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const station = await this.userRepository.findById(id)
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
      const users = await this.userRepository.findAll()
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
