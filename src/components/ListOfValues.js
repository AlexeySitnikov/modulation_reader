/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import style from './styles.module.css'
import { RowsOfValues } from './RowsOfValues'
import {
  addAllRows, deleteCheckedRows, setCheckedAllRows, setUncheckedAllRows,
} from './Redux/Slices/rowCheckSlice/rowCheckSlice'

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

  // const onClickCheckAllColumns = (e) => {
  //   e.stopPropagation()
  // }

  const onDeleteButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteCheckedRows(rows))
  }

  function download(data, filename) {
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

  const makeVaneModulation = () => {
    const modulation = rows.map((el) => Number(el.element.split(' ')[5]))
    modulation.push(modulation[modulation.length - 1])

    const R_0 = rows.map((el) => Number(el.element.split(' ')[7]))
    R_0.push(R_0[R_0.length - 1])

    const Z = rows.map((el) => Number(el.element.split(' ')[22]))

    const step = 0.1
    let z_coor = 0
    let t = 0.0
    let tip = 0n
    const f = []
    let n = 1

    while (t <= Z[0]) {
      tip = ((R_0[0]
        + (t / Z[0]) * (R_0[1] - R_0[0]))
      * (1 - (0.5 * (modulation[0] + modulation[1])
      + 0.5 * (modulation[0] - modulation[1])
      * Math.cos(Math.PI * (t / Z[0])) - 1)
      / (0.5 * (modulation[0] + modulation[1])
      + 0.5 * (modulation[0] - modulation[1])
      * (Math.cos(Math.PI * (t / Z[0])) + 1) * Math.cos(Math.PI * (t / Z[0])))))

      f.push(`${Number.parseFloat(z_coor).toFixed(2)}\t${Number.parseFloat(tip).toFixed(5)}\n`)

      t = Math.round(step * n * 100) / 100
      if (t <= Z[0]) {
        z_coor = Math.round(step * n * 100) / 100
        n += 1
      }
    }

    for (let i = 0; i < Z.length; i += 1) {
      let n1 = 1
      if ((i % 2) === 0) {
        t = Math.round((Math.round((Z[i + 1] - Z[i]) * 100) / 100 - Math.round(t * 100) / 100) * 100 / 100)
        while (t <= Math.round((Z[i + 1] - Z[i]) * 100) / 100) {
          tip = (R_0[i + 1] + ((t / (Z[i + 1] - Z[i])) * (R_0[i + 2] - R_0[i + 1])))
          * (1
            + ((0.5 * (modulation[i + 1] + modulation[i + 2]) + 0.5 * (modulation[i + 1] - modulation[i + 2]) * Math.cos(Math.PI * t / (Z[i + 1] - Z[i])) - 1) / (0.5 * (modulation[i + 1] + modulation[i + 2]) + 0.5 * (modulation[i + 1] - modulation[i + 2]) * Math.cos(Math.PI * t / (Z[i + 1] - Z[i])) + 1)
            ) * (Math.cos(Math.PI * t / (Z[i + 1] - Z[i]))))

          f.push(`${Number.parseFloat(z_coor).toFixed(2)}\t${Number.parseFloat(tip).toFixed(5)}\n`)
          t = Math.round(step * n1 * 100) / 100

          if (t <= Math.round((Z[i + 1] - Z[i]) * 100) / 100) {
            z_coor = Math.round(step * n * 100) / 100
            n += 1
            n1 += 1
          }
        }
      } else {
        t = Math.round((Z[i + 1] - Z[i]) * 100) / 100 - Math.round(t * 100) / 100
        while (t <= Math.round((Z[i + 1] - Z[i]) * 100) / 100) {
          tip = (R_0[i + 1] + ((t / (Z[i + 1] - Z[i])) * (R_0[i + 2] - R_0[i + 1])))
          * (1
            - ((0.5 * (modulation[i + 1] + modulation[i + 2]) + 0.5 * (modulation[i + 1] - modulation[i + 2]) * Math.cos(Math.PI * t / (Z[i + 1] - Z[i])) - 1) / (0.5 * (modulation[i + 1] + modulation[i + 2]) + 0.5 * (modulation[i + 1] - modulation[i + 2]) * Math.cos(Math.PI * t / (Z[i + 1] - Z[i])) + 1)
            ) * (Math.cos(Math.PI * t / (Z[i + 1] - Z[i]))))

          f.push(`${Number.parseFloat(z_coor).toFixed(2)}\t${Number.parseFloat(tip).toFixed(5)}\n`)
          t = Math.round(step * n1 * 100) / 100
          if (t <= Math.round((Z[i + 1] - Z[i]) * 100) / 100) {
            z_coor = Math.round(step * n * 100) / 100
            n += 1
            n1 += 1
          }
        }
      }
    }
    // console.log({ Z })
    // console.log({ f })
    download(f, 'f.txt')
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
            makeVaneModulation()
          }}
        >
          Make vane modulation
        </button>
      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
