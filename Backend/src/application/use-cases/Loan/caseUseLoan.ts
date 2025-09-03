/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { payLoadDto } from '../../../domain/dtos/Loan/payLoan'
import { updateStatusDto } from '../../../domain/dtos/Vehicle/updateStatus'
import { Loan } from '../../../domain/entities/Loan/Loan'
import { Vehicle } from '../../../domain/entities/Vehicule/Vehicule'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'
import { IServicesOperations } from '../../../domain/interfaces/common/IServices'
import { StatusVehicule } from '../../../domain/types/Vehicule/VehiculeEnum'
import { FailureProccess, SuccessProcess } from '../../../presentation/utils/result/result'
import { diffDatesInMinutes, simulateLoan } from '../../../presentation/utils/time/time'
import { ServicePayment } from '../Payment/payment'
import { ServiceVehicle } from '../Vehicle/caseUseVehicle'

export class ServiceLoan implements IServicesOperations {
  private readonly loanRepository: ICrudOperations<Loan>
  private readonly vehicleReposito: ICrudOperations<Vehicle>
  private readonly serviceVehicle: ServiceVehicle
  private readonly servicePayment: ServicePayment
  constructor (
    loanRepository: ICrudOperations<Loan>,
    vehicleRepo: ICrudOperations<Vehicle>,
    serviceVehicle: ServiceVehicle,
    servicePaymeny: ServicePayment
  ) {
    this.loanRepository = loanRepository
    this.vehicleReposito = vehicleRepo
    this.servicePayment = servicePaymeny
    this.serviceVehicle = serviceVehicle
  }

  async create (LoanDto: createLoanDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const findLoan = this.loanRepository.findById(LoanDto.id)
      if (findLoan) {
        return FailureProccess('loan already exists', 400)
      }
      const vehicle = this.vehicleReposito.findById(LoanDto.idVehicle)
      if (!vehicle) {
        return FailureProccess('Vehicle already exists', 400)
      }
      const loan = new Loan(
        LoanDto.id,
        LoanDto.idUser,
        LoanDto.idVehicle,
        vehicle.getIdStation(),
        LoanDto.idStationDestination,
        new Date()
      )
      const updateStatus = new updateStatusDto()
      updateStatus.id = LoanDto.idVehicle
      updateStatus.status = StatusVehicule.IN_USE

      await this.serviceVehicle.updateStatus(updateStatus)
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

  calculateLoan (id: string): number | undefined {
    const loan = this.loanRepository.findById(id)

    if (!loan) {
      return undefined
    }
    const simulation = simulateLoan(loan.getDateStart(), 25) // necesario para simulacion

    const durationHours = diffDatesInMinutes(loan.getDateStart(), simulation)
    const vehicle = this.vehicleReposito.findById(loan.getIdVehicle())

    if (!vehicle) return undefined

    const cost = vehicle.getCostForDuration() * durationHours

    return cost
  }

  async returnVehicleLoaned (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const loan = this.loanRepository.findById(id)

      if (!loan) return FailureProccess('Loan not found', 404)

      const updateStatus = new updateStatusDto()
      updateStatus.id = loan.getIdVehicle()
      updateStatus.status = StatusVehicule.AVAILABLE

      const costTotal = this.calculateLoan(id)

      if (!costTotal) return FailureProccess('Unable to calculate cost. Please try again later.', 400)
      return SuccessProcess(`The total cost is: ${costTotal}`, 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async payOfLoan (dto: payLoadDto): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.servicePayment.doPay(dto.amount, dto.amountForPay, dto.typePay)
      if (!result) return FailureProccess('Please try again later.', 400)
      return SuccessProcess('Payment successfully', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
