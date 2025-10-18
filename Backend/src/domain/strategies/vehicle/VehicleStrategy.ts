
import { Vehicle } from '../../entities/Vehicule/VehicleGeneric/Vehicle'

export interface VehicleStrategy {
  contruct: (dto: any) => Vehicle
}
