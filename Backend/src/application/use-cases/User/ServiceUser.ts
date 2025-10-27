/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { roleAdmin } from '../../../domain/entities/Role/Role'
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'

export class ServiceUser {
  private readonly userRepository: ICrudOperations<User>
  constructor (userRepository: ICrudOperations<User>) {
    this.userRepository = userRepository
  }

  async createAdmin (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const user = new User(
        '1',
        'Admin',
        'admin',
        'admin@gmail.com',
        'admin',
        roleAdmin // rol por defecto
      )

      const findUser = await this.userRepository.findById(user.getCC())

      if (findUser.length > 0) return FailureProccess('admin exist', 404)

      if (!user) {
        return FailureProccess('User not found', 404)
      }
      await this.userRepository.save(user)

      return SuccessProcess('user admin created', 200)
    } catch (error) {
      return FailureProccess('Error fetching user', 500)
    }
  }

  async getById (cc: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const user = await this.userRepository.findById(cc)
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
