/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { finishLoanDto } from '../../../domain/dtos/Loan/FinishLoan'
import { createPaymentDto } from '../../../domain/dtos/payment/create'
import { Loan } from '../../../domain/entities/Loan/Loan'
import { User } from '../../../domain/entities/User/User'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicle'
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
      const findLoan = this.loanRepository.findById(LoanDto.loanId)
      if (findLoan) {
        return FailureProccess('loan already exists', 400)
      }
      const vehicle = this.vehicleReposito.findById(LoanDto.VehicleId)
      if (!vehicle) {
        return FailureProccess('Vehicle already exists', 400)
      }
      const loan = new Loan(
        LoanDto.loanId,
        LoanDto.userId,
        LoanDto.VehicleId,
        LoanDto.startStationId,
        new Date()
      )
      const vehicleInUse = this.vehicleReposito.findById(LoanDto.VehicleId)
      if (!vehicleInUse) {
        return FailureProccess('Vehicle not found', 404)
      }
      vehicleInUse.setState(StatusVehicle.IN_USE)
      this.vehicleReposito.update(vehicleInUse) // actualizamos el estado del vehiculo
      this.loanRepository.save(loan)
      console.log(loan)

      return SuccessProcess(loan, 201)
    } catch (error) {
      return FailureProccess('Error creating loan', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const Loan = this.loanRepository.findById(id)
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
      const Loans = this.loanRepository.findAll()
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
      const loan = this.loanRepository.findById(loanDto.loanId)
      if (!loan) return FailureProccess('Loan not found', 404)

      loan.setEndTime(new Date())
      loan.setStatus(LoanStatus.COMPLETED)
      loan.setEndStationId(loanDto.endStationId) // cambiar por la estacion real

      const durationHours = diffDatesInMinutes(loan.getStartTime(), loan.getEndTime())

      const vehicle = this.vehicleReposito.findById(loan.getVehicleId())
      if (!vehicle) return FailureProccess('Vehicle not found', 404)

      loan.setCost(durationHours * vehicle.getCostForMinute())

      vehicle.setState(StatusVehicle.AVAILABLE)

      const userHistory = this.repositoryUser.findById(loan.getUserId())

      if (!userHistory) return FailureProccess('User not found', 404)
      userHistory.setLoanHistory(loan)

      const verifiy = userHistory.getLoanHistory().filter(u => u.getLoanId() === loan.getLoanId())
      if (verifiy.length === 0) {
        userHistory.setLoanHistory(loan)
      }

      const dto = new createPaymentDto()
      dto.amount = loan.getCost()
      dto.loanId = loan.getLoanId()
      dto.method = PaymentMethod.EFECTIVE

      await this.servicePayment.paymentCreate(dto)
      this.vehicleReposito.update(vehicle)
      this.loanRepository.update(loan)
      this.repositoryUser.update(userHistory)

      console.log(loan)
      return SuccessProcess(loan.getCost(), 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
