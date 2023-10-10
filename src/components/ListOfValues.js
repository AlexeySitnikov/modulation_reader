/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import style from './styles.module.css'
import { RowsOfValues } from './RowsOfValues'
import {
  addAllRows, deleteCheckedRows, setCheckedAllRows, setUncheckedAllRows,
} from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { getTip } from './getTip'

export function ListOfValues({ listOfvariables }) {
  const dispatch = useDispatch()
  const preparedRows = (listOfvariables.filter((el) => el.length > 0).map((element, index) => (
    {
      element,
      checked: false,
      id: index,
    }
  )))
  dispatch(addAllRows(preparedRows))

  const rows = useSelector((store) => store.rows)

  const onClickCheckAllRows = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      dispatch(setCheckedAllRows(rows))
    } else {
      dispatch(setUncheckedAllRows(rows))
    }
  }

  const onDeleteButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteCheckedRows(rows))
  }

  async function download(data, filename) {
    const file = new Blob((data), { type: 'text/plain' })
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
    // if (window.navigator.msSaveOrOpenBlob) { // IE10+
    //   window.navigator.msSaveOrOpenBlob(file, filename)
    // } else { // Others
    //   const a = document.createElement('a')
    //   const url = URL.createObjectURL(file)
    //   a.href = url
    //   a.download = filename
    //   document.body.appendChild(a)
    //   a.click()
    //   setTimeout(() => {
    //     document.body.removeChild(a)
    //     window.URL.revokeObjectURL(url)
    //   }, 0)
    // }
  }

  const makeModulationColumn = () => {
    const modulation = rows.map((el, index) => {
      if (index === rows.length - 1) {
        return (`m${index + 1}="${el.element.split(' ')[5]}" ""\nm${index + 2}="${el.element.split(' ')[5]}" ""\n`)
      }
      return `m${index + 1}="${el.element.split(' ')[5]}" ""\n`
    })
    download(modulation, 'm.txt')
  }

  const makeRColumn = () => {
    const R_0 = rows.map((el, index) => {
      if (index === rows.length - 1) {
        return (`R${index + 1}="${el.element.split(' ')[7]}" ""\nR${index + 2}="${el.element.split(' ')[7]}" ""\n`)
      }
      return `R${index + 1}="${el.element.split(' ')[7]}" ""\n`
    })
    download(R_0, 'R.txt')
  }

  const makeZColumn = () => {
    const Z = rows.map((el, index) => `Z${index + 1}="${el.element.split(' ')[22]}" ""\n`)
    download(Z, 'Z.txt')
  }

  const getHowManyDigits = (number) => (number.toString().length - 2)

  const makeVaneVerticalModulation = () => {
    const modulation = rows.map((el) => Number(el.element.split(' ')[5]))
    modulation.push(modulation[modulation.length - 1])

    const R_0 = rows.map((el) => Number(el.element.split(' ')[7]))
    R_0.push(R_0[R_0.length - 1])

    const Z = rows.map((el) => Number(el.element.split(' ')[22]))

    const step = 0.5
    let z_coor = 0
    let t = 0.0
    let tip = 0n
    let n = 1
    const vertical = []

    while (t <= Z[0]) {
      tip = ((R_0[0]
        + (t / Z[0]) * (R_0[1] - R_0[0]))
      * (1 - (0.5 * (modulation[0] + modulation[1])
      + 0.5 * (modulation[0] - modulation[1])
      * Math.cos(Math.PI * (t / Z[0])) - 1)
      / (0.5 * (modulation[0] + modulation[1])
      + 0.5 * (modulation[0] - modulation[1])
      * (Math.cos(Math.PI * (t / Z[0])) + 1) * Math.cos(Math.PI * (t / Z[0])))))

      vertical.push(`${Number.parseFloat(z_coor / 1)
        .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)

      t = Math.round(step * n * 100000) / 100000
      z_coor = Math.round(step * n * 100000) / 100000
      n += 1
    }

    for (let i = 0; i < Z.length - 1; i += 1) {
      let n1 = 1
      const t_zero = Math.round((z_coor - Z[i]) * 100000) / 100000
      t = Math.round((z_coor - Z[i]) * 100000) / 100000
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
            koef: 1,
          })

          vertical.push(`${Number.parseFloat(z_coor / 1)
            .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
          t = Math.round((t_zero + (step * n1)) * 100) / 100

          z_coor = Math.round(step * n * 100000) / 100000
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
            koef: -1,
          })

          vertical.push(`${Number.parseFloat(z_coor / 1)
            .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
          t = Math.round((t_zero + (step * n1)) * 100000) / 100000
          z_coor = Math.round(step * n * 100000) / 100000
          n += 1
          n1 += 1
        }
      }
    }
    download(vertical, 'vertical.txt')
  }

  const makeVaneHorizontalModulation = () => {
    const modulation = rows.map((el) => Number(el.element.split(' ')[5]))
    modulation.push(modulation[modulation.length - 1])

    const R_0 = rows.map((el) => Number(el.element.split(' ')[7]))
    R_0.push(R_0[R_0.length - 1])

    const Z = rows.map((el) => Number(el.element.split(' ')[22]))

    const step = 0.5
    let z_coor = 0
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

      horizontal.push(`${Number.parseFloat(z_coor / 1)
        .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)

      t = Math.round(step * n * 100000) / 100000
      z_coor = Math.round(step * n * 100000) / 100000
      n += 1
    }

    for (let i = 0; i < Z.length - 1; i += 1) {
      let n1 = 1
      const t_zero = Math.round((z_coor - Z[i]) * 100000) / 100000
      t = Math.round((z_coor - Z[i]) * 100000) / 100000
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

          horizontal.push(`${Number.parseFloat(z_coor / 1)
            .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
          t = Math.round((t_zero + (step * n1)) * 100) / 100

          z_coor = Math.round(step * n * 100000) / 100000
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

          horizontal.push(`${Number.parseFloat(z_coor / 1)
            .toFixed(getHowManyDigits(step))}\t${Number.parseFloat(tip / 1).toFixed(8)}\n`)
          t = Math.round((t_zero + (step * n1)) * 100000) / 100000
          z_coor = Math.round(step * n * 100000) / 100000
          n += 1
          n1 += 1
        }
      }
    }
    download(horizontal, 'horizontal.txt')
  }

  if (!rows) {
    return (
      <div>
        no data
      </div>
    )
  }
  return (
    <div className={style.column}>
      <div>
        <button type="button" onClick={onDeleteButtonHandler}>Delete checked</button>
      </div>
      <div>
        <input type="checkbox" id="checkAllRows" onClick={onClickCheckAllRows} />
        <span>Check all rows</span>
      </div>
      {/* <div>
        <input type="checkbox" id="checkAllColumns" onClick={onClickCheckAllColumns} />
        <span>Check all columns</span>
      </div> */}
      <div>
        <button
          type="button"
          onClick={() => {
            makeModulationColumn()
          }}
        >
          Download m
        </button>
        <button
          type="button"
          onClick={() => {
            makeRColumn()
          }}
        >
          Download R
        </button>
        <button
          type="button"
          onClick={() => {
            makeZColumn()
          }}
        >
          Download Z
        </button>
        <button
          type="button"
          onClick={() => {
            makeVaneVerticalModulation()
          }}
        >
          Make vane vertical modulation
        </button>
        <button
          type="button"
          onClick={() => {
            makeVaneHorizontalModulation()
          }}
        >
          Make vane horizontal modulation
        </button>
      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
