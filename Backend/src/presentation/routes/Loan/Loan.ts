import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { RepositotyLoan } from '../../../infrastructure/repositories/Loan/loan'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { UserRepository } from '../../../infrastructure/repositories/User/repository'
import { ServiceLoan } from '../../../application/use-cases/Loan/caseUseLoan'
import { LoanController } from '../../controllers/Loan/Loan'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { finishLoanDto } from '../../../domain/dtos/Loan/FinishLoan'

export const routeLoan = (prefix: string): Router => {
  const repositoryLoan = new RepositotyLoan()
  const repositoryVehicle = new RepositoryVehicule()
  const respositoryUser = new UserRepository()

  const serviceLoan = new ServiceLoan(repositoryLoan, repositoryVehicle, respositoryUser)

  const controller = new LoanController(serviceLoan)

  route.post(`${prefix}`, validateDto(createLoanDto), controller.createLoan)
  route.get(`${prefix}`, controller.getLoan)
  route.get(`${prefix}/:id`, controller.getLoanId)
  route.patch(`${prefix}`, validateDto(finishLoanDto), controller.returnVehicleLoaned)

  return route
}
