import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PaymentMethod } from '../../types/Payment/PaymentMethod'

export class createPaymentDto {
  @IsNumber()
    amount!: number

  @IsNotEmpty()
  @IsString()
    method!: PaymentMethod

  @IsNotEmpty()
  @IsString()
    loanId!: string
}
