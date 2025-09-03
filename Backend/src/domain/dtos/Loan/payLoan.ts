import { IsNotEmpty, IsNumber } from 'class-validator'
import { payments } from '../../types/Payment/type-payment'

export class payLoadDto {
  @IsNumber()
  @IsNotEmpty()
    amount!: number

  @IsNumber()
  @IsNotEmpty()
    amountForPay!: number

  @IsNotEmpty()
    typePay !: payments
}
