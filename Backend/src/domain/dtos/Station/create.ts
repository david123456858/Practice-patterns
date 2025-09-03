import { IsNotEmpty, IsString } from 'class-validator'
import { GeoLocation } from '../../entities/GeoLocation/GeoLocation'

export class createStationDto {
  @IsString()
  @IsNotEmpty()
    id!: string

  @IsString()
  @IsNotEmpty()
    name!: string

  @IsString()
  @IsNotEmpty()
    address!: string

  @IsNotEmpty()
    geoLocation!: GeoLocation
}
