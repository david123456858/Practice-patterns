export function diffDates (date1: Date, date2: Date): any {
  const diffMs = Math.abs(date2.getTime() - date1.getTime()) // diferencia en ms
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  //   const days = Math.floor(hours / 24)
  //   const remainingHours = hours % 24

  return hours
}
