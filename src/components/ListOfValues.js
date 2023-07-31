import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import style from './styles.module.css'
import { removeAllColumns } from './Redux/Slices/columnCheckSlice/columnCheckSlice'
import { removeAllRows } from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { RowsOfValues } from './RowsOfValues'

export function ListOfValues({ listOfvariables }) {
  const [checkAllColumns, setCheckAllColumns] = useState(false)
  const [checkAllRows, setCheckAllRows] = useState(false)
  const dispatch = useDispatch()
  const [rows, setRows] = useState()

  useEffect(() => {
    if (listOfvariables) {
      setRows(listOfvariables.filter((el) => el.length > 0))
    }
  }, [listOfvariables])

  const onClickCheckAllRows = (e) => {
    e.stopPropagation()
    setCheckAllRows(!checkAllRows)
    if (checkAllRows) {
      dispatch(removeAllRows())
    }
  }

  const onClickCheckAllColumns = (e) => {
    e.stopPropagation()
    setCheckAllColumns(!checkAllColumns)
    if (checkAllColumns) {
      dispatch(removeAllColumns())
    }
  }

  const onClickButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
        <button type="button" onClick={onClickButtonHandler}>Delete unchecked</button>
      </div>
      <div>
        <input type="checkbox" id="checkAllRows" onClick={onClickCheckAllRows} />
        <span>Check all rows</span>
      </div>
      <div>
        <input type="checkbox" id="checkAllColumns" onClick={onClickCheckAllColumns} />
        <span>Check all columns</span>
      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
