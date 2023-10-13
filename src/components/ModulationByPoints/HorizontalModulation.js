import { Download } from '../Dowload/Download'
import { getHowManyDigits } from '../constrains/getHowManyDigits'
import { getTip } from '../constrains/getTip'

export function HorizontalModulation({ rows, step }) {
  const modulation = rows.map((el) => Number(el.element.split(' ')[5]))
  modulation.push(modulation[modulation.length - 1])

  const R_0 = rows.map((el) => Number(el.element.split(' ')[7]))
  R_0.push(R_0[R_0.length - 1])

  const Z = rows.map((el) => Number(el.element.split(' ')[22]))

  // const step = 0.5
  let zCoordinate = 0
  let t = 0.0
  let tip = 0n
  let n = 1
  const horizontal = []

  while (t <= Z[0]) {
    tip = ((R_0[0]
      + (t / Z[0]) * (R_0[1] - R_0[0]))
    * (1 + (0.5 * (modulation[0] + modulation[1])
    + 0.5 * (modulation[0] - modulation[1])
    * Math.cos(Math.PI * (t / Z[0])) - 1)
    / (0.5 * (modulation[0] + modulation[1])
    + 0.5 * (modulation[0] - modulation[1])
    * (Math.cos(Math.PI * (t / Z[0])) + 1) * Math.cos(Math.PI * (t / Z[0])))))

    horizontal.push(`${Number.parseFloat(zCoordinate / 1)
      .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)

    t = Math.round(step * n * 100000) / 100000
    zCoordinate = Math.round(step * n * 100000) / 100000
    n += 1
  }

  for (let i = 0; i < Z.length - 1; i += 1) {
    let n1 = 1
    const tZero = Math.round((zCoordinate - Z[i]) * 100000) / 100000
    t = Math.round((zCoordinate - Z[i]) * 100000) / 100000
    if ((i % 2) === 0) {
      while (t <= Math.round((Z[i + 1] - Z[i]) * 100000) / 100000) {
        tip = getTip({
          t,
          Z_start: Z[i],
          Z_end: Z[i + 1],
          R0_start: R_0[i + 1],
          R0_end: R_0[i + 2],
          m_start: modulation[i + 1],
          m_end: modulation[i + 2],
          koef: -1,
        })

        horizontal.push(`${Number.parseFloat(zCoordinate / 1)
          .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
        t = Math.round((tZero + (step * n1)) * 100) / 100

        zCoordinate = Math.round(step * n * 100000) / 100000
        n += 1
        n1 += 1
      }
    } else {
      while (t <= Math.round((Z[i + 1] - Z[i]) * 100000) / 100000) {
        tip = getTip({
          t,
          Z_start: Z[i],
          Z_end: Z[i + 1],
          R0_start: R_0[i + 1],
          R0_end: R_0[i + 2],
          m_start: modulation[i + 1],
          m_end: modulation[i + 2],
          koef: 1,
        })

        horizontal.push(`${Number.parseFloat(zCoordinate / 1)
          .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
        t = Math.round((tZero + (step * n1)) * 100000) / 100000
        zCoordinate = Math.round(step * n * 100000) / 100000
        n += 1
        n1 += 1
      }
    }
  }
  Download(horizontal, 'horizontal.txt')
}
