/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserDtoAuth } from '../../../domain/dtos/User/auth'
import { UserDtoCreate } from '../../../domain/dtos/User/createDto'
import { roleClient } from '../../../domain/entities/Role/Role'
import { User } from '../../../domain/entities/User/User'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { UserRepository } from './../../../infrastructure/repositories/User/repository'

export class AuthService {
  private readonly userRepository: UserRepository
  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async authenticate (data: UserDtoAuth): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      const user = this.userRepository.findByEmail(data.email)

      if (!user) return FailureProccess('User not found', 404)
      console.log(user)

      if (user.getPassword() !== data.password) return FailureProccess('Invalid credentials', 401)
      return SuccessProcess(user.getRole(), 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }

  async register (data: UserDtoCreate): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      const findUser = this.userRepository.findById(data.idUser)
      if (findUser) return FailureProccess('User already exists', 400)
      const newUser = new User(data.idUser, data.name, data.lastName, data.email, data.password, roleClient)
      this.userRepository.save(newUser)
      return SuccessProcess('User created successfully', 200)
    } catch (error) {
      return FailureProccess('Error internal server', 500)
    }
  }
}
