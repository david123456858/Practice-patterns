import { IsNotEmpty, IsObject, IsString } from 'class-validator'
import { TypeVehicule } from '../../entities/TypeVehicule/TypeVehicule'

export class createVehicleDto {
  @IsNotEmpty()
  @IsString()
    id!: string

  @IsNotEmpty()
  @IsString()
    idStation!: string

  @IsNotEmpty()
  @IsObject()
    typeVehicule!: TypeVehicule
}
