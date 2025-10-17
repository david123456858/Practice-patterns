
import { GeoLocation } from '../../domain/entities/GeoLocation/GeoLocation'
import { Station } from '../../domain/entities/Station/Station'
import { Bicycle } from '../../domain/entities/Vehicule/VehicleGeneric/Bicycle'
import { StatusVehicle, VehicleType } from '../../domain/types/Vehicule/VehiculeEnum'

const geoLocation = new GeoLocation(10.47412, -73.25129)
export const bici1 = new Bicycle(
  'BIC001',
  'Rojo',
  'Mountain Pro',
  new Station('1', 'Sede Don carmelo', 'Calle 14 45-5', new GeoLocation(1.2151, 244.5423232)),
  StatusVehicle.AVAILABLE,
  geoLocation,
  VehicleType.BICYCLE,
  120,
  25,
  1000,
  4,
  true
)
export const bici2 = new Bicycle(
  'BIC002',
  'Amarrilla',
  'Mountain',
  new Station('1', 'Sede Don carmelo', 'Calle 14 45-5', new GeoLocation(1.2151, 244.5423232)),
  StatusVehicle.AVAILABLE,
  geoLocation,
  VehicleType.BICYCLE,
  120,
  25,
  50,
  4,
  true
)
