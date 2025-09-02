/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createStationDto } from '../../../domain/dtos/Station/create'
import { Station } from '../../../domain/entities/Station/Station'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProcess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceStation {
  private readonly userRepository: ICrudOperations<Station>
  constructor (userRepository: ICrudOperations<Station>) {
    this.userRepository = userRepository
  }

  async create (stationDto: createStationDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findStation = this.userRepository.findById(stationDto.id)
      if (findStation) {
        return FailureProcess('User already exists', 400)
      }
      const station = new Station(
        stationDto.id,
        stationDto.name,
        stationDto.adress,
        stationDto.geoLocation
      )
      this.userRepository.save(station)
      return SuccessProcess('User created successfully', 201)
    } catch (error) {
      return FailureProcess('Error creating user', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const station = this.userRepository.findById(id)
      if (!station) {
        return FailureProcess('User not found', 404)
      }
      return SuccessProcess(station, 200)
    } catch (error) {
      return FailureProcess('Error fetching user', 500)
    }
  }

  async findAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const users = this.userRepository.findAll()
      return SuccessProcess(users, 200)
    } catch (error) {
      return FailureProcess('Error fetching users', 500)
    }
  }
}
