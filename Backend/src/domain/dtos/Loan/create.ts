import { IsNotEmpty, IsString } from 'class-validator'

export class createLoanDto {
  @IsString()
  @IsNotEmpty()
    loanId!: string

  @IsString()
  @IsNotEmpty()
    userId!: string

  @IsString()
  @IsNotEmpty()
    vehicleId!: string

  @IsString()
  @IsNotEmpty()
    startStationId!: string
}
