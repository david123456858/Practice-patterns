export function diffDatesInMinutes (date1: Date, date2: Date): number {
  const diffMs = Math.abs(date2.getTime() - date1.getTime()) // diferencia en ms
  const minutes = diffMs / (1000 * 60) // convierte directamente a minutos (decimales)
  return Math.floor(minutes) // redondeamos hacia abajo (solo minutos completos)
}

export function simulateLoan (start: Date, durationMinutes: number): Date {
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000)
  return end
}
