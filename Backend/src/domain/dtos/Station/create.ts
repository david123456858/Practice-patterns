import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { GeoLocationDto } from '../Vehicle/classDto'

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
  @ValidateNested()
  @Type(() => GeoLocationDto)
    geoLocation!: GeoLocationDto
}
