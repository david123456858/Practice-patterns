export abstract class VehicleFactory {
  abstract createVehicleElectric (vehicle: any): any
  abstract createVehicleMecacnic (vehicle: any): any

  createVehicle (vehicle: any, isElectric: boolean): any {
    return isElectric ? this.createVehicleElectric(vehicle) : this.createVehicleMecacnic(vehicle)
  }
}
