import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class createTypeVehicleDto {
  @IsString()
  @IsNotEmpty()
    name!: string

  @IsNotEmpty()
  @IsNumber()
    costForDuration!: number
}
