export function getDimension(dimension) {
  switch (dimension) {
    case 'cm': return 10
    case 'dm': return 100
    case 'm': return 1000
    default: return 1
  }
}
