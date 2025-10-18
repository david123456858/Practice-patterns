import { GeoLocation } from '../../entities/GeoLocation/GeoLocation'
import { Station } from '../../entities/Station/Station'
import { Vehicle } from '../../entities/Vehicule/VehicleGeneric/Vehicle'
import { StatusVehicle, VehicleType } from '../../types/Vehicule/VehiculeEnum'

export interface VehicleBuilder {
  setIdVehicle: (id: string) => void
  setColor: (color: string) => void
  setModel: (model: string) => void
  setStation: (station: Station) => void
  setState: (state: StatusVehicle) => void
  setType: (type: VehicleType) => void
  setGeoLocation: (geoLocation: GeoLocation) => void
  setMaxUserWeight: (weight: number) => void
  setVelocityMax: (velocity: number) => void
  setCostForMinute: (cost: number) => void
  build: () => Vehicle
}
