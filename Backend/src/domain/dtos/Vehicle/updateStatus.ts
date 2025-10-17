import { IsNotEmpty, IsString } from 'class-validator'
import { StatusVehicle } from '../../types/Vehicule/VehiculeEnum'

export class updateStatusDto {
  @IsNotEmpty()
  @IsString()
    id!: string

  @IsNotEmpty()
    status!: StatusVehicle
}
