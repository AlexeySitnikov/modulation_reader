export function isGoodZ(Z) {
  for (let index = 0; index < Z.length; index += 1) {
    if (Number.isNaN(Z[index])) return false
  }
  return (true)
}
