/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { Loan } from '../../../domain/entities/Loan/Loan'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { diffDates } from '../../../presentation/utils/time/time'

export class ServiceLoan implements IServicesOperations {
  private readonly loanRepository: ICrudOperations<Loan>
  private readonly vehicleReposito: ICrudOperations<Vehicle>
  constructor (loanRepository: ICrudOperations<Loan>, vehicleRepo: ICrudOperations<Vehicle>) {
    this.loanRepository = loanRepository
    this.vehicleReposito = vehicleRepo
  }

  async create (LoanDto: createLoanDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findLoan = this.loanRepository.findById(LoanDto.id)
      if (!findLoan) {
        return FailureProccess('loan already exists', 400)
      }
      const loan = new Loan(
        LoanDto.id,
        LoanDto.idUser,
        LoanDto.idVehicle,
        LoanDto.idStationOrigin,
        LoanDto.idStationDestination,
        new Date()
      )
      this.loanRepository.save(loan)
      return SuccessProcess('loan created successfully', 201)
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

  calcucalateLoan (id: string): number | undefined {
    const loan = this.loanRepository.findById(id)
    if (!loan) {
      return undefined
    }
    const durationHours = diffDates(loan.getDateStart(), new Date())

    const vehicle = this.vehicleReposito.findById(loan.getIdVehicle())
    if (!vehicle) return undefined

    const cost = vehicle.getCostForDuration() * durationHours.totalHours
    return cost
  }

  async returnVehicleLoaned (idLoan: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
