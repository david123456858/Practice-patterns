export class GeoLocation {
  private latitude: number
  private longitude: number
  private readonly timestamp: Date
  constructor (latitude: number, longitude: number, timestamp?: Date) {
    this.latitude = latitude
    this.longitude = longitude
    this.timestamp = timestamp ?? new Date()
  }

  getLatitude (): number {
    return this.latitude
  }

  getLongitude (): number {
    return this.longitude
  }

  getTimestamp (): Date {
    return this.timestamp
  }

  setLocation (latitude: number, longitude: number): void {
    this.latitude = latitude
    this.longitude = longitude
  }
}
