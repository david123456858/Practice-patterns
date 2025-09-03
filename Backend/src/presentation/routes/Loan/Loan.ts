import { Router } from 'express'
import { route } from '../../../infrastructure/config/config'
import { validateDto } from '../../middlewares/ValidateDto/validate'
import { createLoanDto } from '../../../domain/dtos/Loan/create'
import { RepositotyLoan } from '../../../infrastructure/repositories/Loan/loan'
import { RepositoryVehicule } from '../../../infrastructure/repositories/Vehicule/vehicule'
import { ServiceVehicle } from '../../../application/use-cases/Vehicle/caseUseVehicle'
import { RepositoryTypeVehicule } from '../../../infrastructure/repositories/TypeVehicule/TypesVehicule'
import { repositoryStation } from '../../../infrastructure/repositories/Station/station'
import { ServiceLoan } from '../../../application/use-cases/Loan/caseUseLoan'
import { ServicePayment } from '../../../application/use-cases/Payment/payment'
import { LoanController } from '../../controllers/Loan/Loan'
import { payLoadDto } from '../../../domain/dtos/Loan/payLoan'

export const routeLoan = (prefix: string): Router => {
  const repositoryLoan = new RepositotyLoan()
  const repositoryVehicle = new RepositoryVehicule()
  const repostoryStation = new repositoryStation()
  const repositoryTypeVehicle = new RepositoryTypeVehicule()

  const serviceVehicle = new ServiceVehicle(repositoryVehicle, repositoryTypeVehicle, repostoryStation)
  const servicePay = new ServicePayment()
  const serviceLoan = new ServiceLoan(repositoryLoan, repositoryVehicle, serviceVehicle, servicePay)

  const controller = new LoanController(serviceLoan)

  route.post(`${prefix}`, validateDto(createLoanDto), controller.createLoan)
  route.get(`${prefix}`, controller.getLoan)
  route.get(`${prefix}/:id`, controller.getLoanId)
  route.put(`${prefix}/:id/vehicule`, controller.returnVehicleLoaned)
  route.post(`${prefix}/pay`, validateDto(payLoadDto), controller.payLoan)

  return route
}
