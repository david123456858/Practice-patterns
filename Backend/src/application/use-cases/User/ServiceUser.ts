/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserDtoCreate } from '../../../domain/dtos/User/createDto'
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProcess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceUser {
  private readonly userRepository: ICrudOperations<User>
  constructor (userRepository: ICrudOperations<User>) {
    this.userRepository = userRepository
  }

  async create (userDto: UserDtoCreate): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findUser = this.userRepository.findById(userDto.cc)
      if (findUser) {
        return FailureProcess('User already exists', 400)
      }
      const user = new User(userDto.cc, userDto.name, userDto.email)
      this.userRepository.save(user)
      return SuccessProcess('User created successfully', 201)
    } catch (error) {
      return FailureProcess('Error creating user', 500)
    }
  }

  async getById (cc: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const user = this.userRepository.findById(cc)
      if (!user) {
        return FailureProcess('User not found', 404)
      }
      return SuccessProcess(user, 200)
    } catch (error) {
      return FailureProcess('Error fetching user', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('Users fetched successfully', 200)
    } catch (error) {
      return FailureProcess('Error fetching users', 500)
    }
  }
}
