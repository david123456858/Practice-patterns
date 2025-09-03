/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserDtoCreate } from '../../../domain/dtos/User/createDto'
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceUser implements IServicesOperations {
  private readonly userRepository: ICrudOperations<User>
  constructor (userRepository: ICrudOperations<User>) {
    this.userRepository = userRepository
  }

  async create (userDto: UserDtoCreate): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findUser = this.userRepository.findById(userDto.cc)
      if (findUser) {
        return FailureProccess('User already exists', 400)
      }
      const user = new User(userDto.cc, userDto.name, userDto.email)
      this.userRepository.save(user)
      return SuccessProcess('User created successfully', 201)
    } catch (error) {
      return FailureProccess('Error creating user', 500)
    }
  }

  async getById (cc: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const user = this.userRepository.findById(cc)
      if (!user) {
        return FailureProccess('User not found', 404)
      }
      return SuccessProcess(user, 200)
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
