import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RowOfCheckBox } from './RowOfCheckBox'
import { RowOfValues } from './RowOfValues'
import style from './styles.module.css'
import { removeAllColumns } from './Redux/Slices/columnCheckSlice/columnCheckSlice'
import { removeAllRows } from './Redux/Slices/rowCheckSlice/rowCheckSlice'

export function ListOfValues({ listOfvariables }) {
  const dispatch = useDispatch()
  const [checkAllColumns, setCheckAllColumns] = useState(false)
  const [checkAllRows, setCheckAllRows] = useState(false)

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

  if (!listOfvariables) {
    return (
      <div>
        no data
      </div>
    )
  }
  return (
    <div className={style.column}>
      <div>
        <input type="checkbox" id="checkAllRows" onClick={onClickCheckAllRows} />
        <span>Check all rows</span>
      </div>
      <div>
        <input type="checkbox" id="checkAllColumns" onClick={onClickCheckAllColumns} />
        <span>Check all columns</span>
      </div>
      {listOfvariables
        .filter((el) => el.length > 0)
        .map((el, index) => (
          (index === 0)
            ? (
              <RowOfCheckBox key={crypto.randomUUID()} firstRow={el} />
            )
            : <RowOfValues key={crypto.randomUUID()} index={index} element={el} />
        ))}
    </div>
  )
}
