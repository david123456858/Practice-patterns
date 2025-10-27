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

  // 🔹 LOGIN / AUTHENTICATE
  async authenticate (data: UserDtoAuth): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      // Buscar usuario por correo
      const userResult = await this.userRepository.findByEmail(data.email)
      const user = Array.isArray(userResult) ? userResult[0] : userResult

      if (!user) return FailureProccess('User not found', 404)

      // Validar contraseña (en texto plano por ahora)
      if (user.password !== data.password) {
        return FailureProccess('Invalid credentials', 401)
      }

      // Armar respuesta DTO
      const userDtoResponse = {
        userEmail: user.email,
        userId: user.idUser,
        userName: user.name,
        role: user.role
      }

      return SuccessProcess(userDtoResponse, 200)
    } catch (error) {
      console.error('Auth Error:', error)
      return FailureProccess('Internal server error', 500)
    }
  }

  // 🔹 REGISTER / SIGNUP
  async register (data: UserDtoCreate): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      const existingUser = await this.userRepository.findByEmail(data.email)
      const userFound = Array.isArray(existingUser) && existingUser.length > 0 ? existingUser[0] : null

      if (userFound) {
        return FailureProccess('User already exists', 400)
      }

      // Crear entidad de dominio User
      const newUser = new User(
        data.idUser,
        data.name,
        data.lastName,
        data.email,
        data.password,
        roleClient // rol por defecto
      )

      await this.userRepository.save(newUser)
      return SuccessProcess('User created successfully', 201)
    } catch (error) {
      console.error('Register Error:', error)
      return FailureProccess('Internal server error', 500)
    }
  }
}
