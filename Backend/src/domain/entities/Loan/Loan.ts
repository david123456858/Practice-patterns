import { LoanStatus } from '../../types/Loan/LoanEnum'

export class Loan {
  private readonly loanId: string
  private readonly userId: string
  private readonly vehicleId: string
  private readonly startTime: Date
  private endTime: Date | null
  private readonly startStationId: string
  private endStationId: string | null
  private status: LoanStatus
  private cost: number

  constructor (
    loanId: string,
    userId: string,
    vehicleId: string,
    startStationId: string,
    startTime: Date,
    status: LoanStatus = LoanStatus.ACTIVE
  ) {
    this.loanId = loanId
    this.userId = userId
    this.vehicleId = vehicleId
    this.startTime = startTime
    this.endTime = null
    this.startStationId = startStationId
    this.endStationId = null
    this.status = status
    this.cost = 0
  }

  // Getters
  getLoanId (): string {
    return this.loanId
  }

  getUserId (): string {
    return this.userId
  }

  getVehicleId (): string {
    return this.vehicleId
  }

  getStartTime (): Date {
    return this.startTime
  }

  getEndTime (): Date | null {
    return this.endTime
  }

  getStartStationId (): string {
    return this.startStationId
  }

  getEndStationId (): string | null {
    return this.endStationId
  }

  getStatus (): LoanStatus {
    return this.status
  }

  getCost (): number {
    return this.cost
  }

  // Setters
  setEndTime (endTime: Date): void {
    this.endTime = endTime
  }

  setEndStationId (stationId: string): void {
    this.endStationId = stationId
  }

  setStatus (status: LoanStatus): void {
    this.status = status
  }

  setCost (cost: number): void {
    this.cost = cost
  }
}
