import { Battery } from '../../domain/entities/Battery/Battery'
import { GeoLocation } from '../../domain/entities/GeoLocation/GeoLocation'
import { Bicycle } from '../../domain/entities/Vehicule/Bicycle'
import { ElectricScooter } from '../../domain/entities/Vehicule/ElectricScooter'
import { StatusVehicle, VehicleType } from '../../domain/types/Vehicule/VehiculeEnum'

const geoLocation = new GeoLocation(10.47412, -73.25129)
const BatteryInfo = new Battery(160, 5)
const BatteryInfo2 = new Battery(200, 10)
export const bici1 = new Bicycle(
  'BIC001',
  'Rojo',
  'Mountain Pro',
  '1',
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
  '1',
  StatusVehicle.AVAILABLE,
  geoLocation,
  VehicleType.BICYCLE,
  120,
  25,
  50,
  4,
  true
)

export const scooter1 = new ElectricScooter('SCO001',
  'Negro oro',
  'Electric Pro',
  '1',
  StatusVehicle.AVAILABLE,
  VehicleType.BICYCLE,
  geoLocation,
  120,
  25,
  1500,
  true,
  BatteryInfo
)

export const scooter2 = new ElectricScooter('SCO002',
  'Negro',
  'Electric Pro',
  '1',
  StatusVehicle.AVAILABLE,
  VehicleType.BICYCLE,
  geoLocation,
  120,
  25,
  1200,
  true,
  BatteryInfo2
)
