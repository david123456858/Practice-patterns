export class ElectricComponents {
  constructor (
    private capacity: number,
    private autonomyRange: number
  ) {}

  // Getters
  getCapacity (): number { return this.capacity }
  getAutonomyRange (): number { return this.autonomyRange }

  // Setters
  setCapacity (capacity: number): void { this.capacity = capacity }
  setAutonomyRange (range: number): void { this.autonomyRange = range }
}
