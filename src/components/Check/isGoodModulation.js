export function isGoodModulation(modulation) {
  for (let index = 0; index < modulation.length; index += 1) {
    if (Number.isNaN(modulation[index])) return false
  }
  return (true)
}
