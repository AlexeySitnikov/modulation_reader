/* eslint-disable camelcase */
export function isGoodR0(R_0) {
  for (let index = 0; index < R_0.length; index += 1) {
    if (Number.isNaN(R_0[index])) return false
  }
  return (true)
}
