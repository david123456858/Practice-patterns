/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { UserRepository } from './../../../infrastructure/repositories/User/repository'
export class AuthService {
  private readonly userRepository: UserRepository
  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async authenticate (data: any): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async register (data: any): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      const findUser = this.userRepository.findById(data.id)
      if (findUser) return FailureProccess('User already exists', 400)
      return SuccessProcess('User created successfully', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
