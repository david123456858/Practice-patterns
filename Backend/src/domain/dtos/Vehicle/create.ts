import { Type, TypeHelpOptions } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { BaseVehicleDto } from './classDto'
import { ClassVehicleConcrete } from './concreteDto'
import { ProviderTypeVehicle } from './Provider'

export class VehicleDtoEspefic extends BaseVehicleDto {
  @ValidateNested()
  @Type((options?: TypeHelpOptions | undefined) => {
    const provider = (options?.object as VehicleDtoEspefic)?.vehicleType
    const provoderService = new ProviderTypeVehicle()
    const classDto = provoderService.getVehicleClass(provider)

    return classDto
  })
    propities!: ClassVehicleConcrete
}
