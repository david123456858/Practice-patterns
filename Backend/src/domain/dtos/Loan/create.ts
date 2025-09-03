import { IsNotEmpty, IsString } from 'class-validator'

export class createLoanDto {
  @IsString()
  @IsNotEmpty()
    id!: string

  @IsString()
  @IsNotEmpty()
    idUser!: string

  @IsString()
  @IsNotEmpty()
    idVehicle!: string

  @IsString()
  @IsNotEmpty()
    idStationDestination!: string
}
