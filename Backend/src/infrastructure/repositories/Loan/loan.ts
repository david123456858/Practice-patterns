import { Loan } from '../../../domain/entities/Loan/Loan'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

let LoanList: Loan[] = []

export class RepositotyLoan implements ICrudOperations<Loan> {
  save (data: Loan): void {
    LoanList.push(data)
  }

  delete (id: string): void {
    LoanList = LoanList.filter(loan => loan.getId() !== id)
  }

  update (data: Loan): void {
    const index = LoanList.findIndex(loan => loan.getId() === data.getId())
    if (index !== -1) {
      LoanList[index] = data
    }
  }

  findById (id: string): Loan | undefined {
    return LoanList.find(station => station.getId() === id)
  }

  findAll (): Loan[] {
    return LoanList
  }
}
