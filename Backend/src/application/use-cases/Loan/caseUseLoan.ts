/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { finishLoanDto } from '../../../domain/dtos/Loan/FinishLoan'
import { createPaymentDto } from '../../../domain/dtos/payment/create'
import { Loan } from '../../../domain/entities/Loan/Loan'
import { User } from '../../../domain/entities/User/User'
import { Vehicle } from '../../../domain/entities/Vehicule/VehicleGeneric/Vehicle'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { LoanStatus } from '../../../domain/types/Loan/LoanEnum'
import { PaymentMethod } from '../../../domain/types/Payment/PaymentMethod'
import { StatusVehicle } from '../../../domain/types/Vehicule/VehiculeEnum'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { diffDatesInMinutes } from '../../../presentation/utils/time/time'
import { ServicePayment } from '../Payment/payment'

export class ServiceLoan implements IServicesOperations {
  constructor (
    private readonly loanRepository: ICrudOperations<Loan>,
    private readonly vehicleReposito: ICrudOperations<Vehicle>,
    private readonly repositoryUser: ICrudOperations<User>,
    private readonly servicePayment: ServicePayment
  ) {}

  async create (LoanDto: createLoanDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findLoan = await this.loanRepository.findById(LoanDto.loanId)
      if (findLoan.length > 1) {
        return FailureProccess('loan already exists', 400)
      }
      const loan = new Loan(
        LoanDto.loanId,
        LoanDto.userId,
        LoanDto.vehicleId,
        LoanDto.startStationId,
        new Date()
      )
      const vehicleInUse = await this.vehicleReposito.findById(LoanDto.vehicleId)
      if (!vehicleInUse) {
        return FailureProccess('Vehicle not found', 404)
      }
      const vehicle = vehicleInUse.find(index => index.idVehicle === LoanDto.vehicleId)
      vehicle.state = StatusVehicle.IN_USE
      this.vehicleReposito.update(vehicle) // actualizamos el estado del vehiculo
      this.loanRepository.save(loan)
      console.log(loan)

      return SuccessProcess(loan, 201)
    } catch (error) {
      return FailureProccess('Error creating loan', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const Loan = await this.loanRepository.findById(id)
      if (!Loan) {
        return FailureProccess('loan not found', 404)
      }
      return SuccessProcess(Loan, 200)
    } catch (error) {
      return FailureProccess('Error fetching loan', 500)
    }
  }

  async getAll (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const Loans = await this.loanRepository.findAll()
      return SuccessProcess(Loans, 200)
    } catch (error) {
      return FailureProccess('Error fetching loans', 500)
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

  async returnVehicleLoaned (loanDto: finishLoanDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
    // 🔹 1. Buscar préstamo
      const loanResult = await this.loanRepository.findById(loanDto.loanId)
      const loan = loanResult.find(index => index.loanId === loanDto.loanId)
      if (!loan) return FailureProccess('Loan not found', 404)

      // 🔹 2. Actualizar estado y tiempos
      const endTime = new Date()
      const startTime = new Date(loan.startTime)
      const durationMinutes = diffDatesInMinutes(startTime, endTime)
      const cost = durationMinutes * Number(loan.cost || 0)

      loan.endTime = endTime
      loan.status = LoanStatus.COMPLETED
      loan.endStationId = loanDto.endStationId
      loan.cost = cost.toString()

      // 🔹 3. Buscar vehículo
      const vehicleResult = await this.vehicleReposito.findById(loan.vehicleId)
      const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult
      if (!vehicle) return FailureProccess('Vehicle not found', 404)

      vehicle.state = StatusVehicle.AVAILABLE

      // 🔹 4. Buscar usuario
      const userResult = await this.repositoryUser.findById(loan.userId)
      const user = Array.isArray(userResult) ? userResult[0] : userResult
      if (!user) return FailureProccess('User not found', 404)

      // 🔹 5. Crear pago
      const dto = new createPaymentDto()
      dto.amount = cost
      dto.loanId = loan.loanId
      dto.method = PaymentMethod.EFECTIVE

      const paymentResult = await this.servicePayment.paymentCreate(dto)
      if (!paymentResult.success) {
        return FailureProccess('Payment creation failed', 400)
      }
      console.log(vehicle)
      console.log(loan)
      console.log(user)

      // 🔹 6. Actualizar entidades en DB
      await this.vehicleReposito.update(vehicle)
      await this.loanRepository.update(loan)
      await this.repositoryUser.update(user)

      return SuccessProcess(paymentResult.value, 200)
    } catch (error) {
      console.error('Error in returnVehicleLoaned:', error)
      return FailureProccess('Internal Server Error', 500)
    }
  }
}
