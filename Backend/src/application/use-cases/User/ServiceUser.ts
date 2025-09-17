/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceUser {
  private readonly userRepository: ICrudOperations<User>
  constructor (userRepository: ICrudOperations<User>) {
    this.userRepository = userRepository
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

      const usersClean = users.map(user => user.toJSON())

      return SuccessProcess(usersClean, 200)
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
