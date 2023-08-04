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
      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
