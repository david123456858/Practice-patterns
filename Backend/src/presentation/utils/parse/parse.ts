export const parseJson = (data: any[]): any => {
  const parseData = data.map(item => ({
    ...item,
    info: (() => {
      if (item.info == null) return null
      if (typeof item.info === 'string') {
        try {
          return JSON.parse(item.info)
        } catch {
          return item.info // si no es JSON válido
        }
      }
      return item.info // ya es un objeto
    })()
  }))
  return parseData
}
