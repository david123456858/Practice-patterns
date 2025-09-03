import { IsNotEmpty, IsString } from 'class-validator'
import { StatusVehicule } from '../../types/Vehicule/VehiculeEnum'

export class updateStatusDto {
  @IsNotEmpty()
  @IsString()
    id!: string

  @IsNotEmpty()
    status!: StatusVehicule
}
