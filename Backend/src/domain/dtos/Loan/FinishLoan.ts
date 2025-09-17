import { IsNotEmpty, IsString } from 'class-validator'

export class finishLoanDto {
  @IsString()
  @IsNotEmpty()
    loanId!: string

  @IsString()
  @IsNotEmpty()
    endStationId!: string
}
