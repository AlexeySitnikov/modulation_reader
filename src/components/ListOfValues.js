import { useDispatch, useSelector } from 'react-redux'
import style from './styles.module.css'
import { RowsOfValues } from './RowsOfValues'
import {
  addAllRows, deleteUncheckedRows, setCheckedAllRows, setUncheckedAllRows,
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

  const onClickCheckAllColumns = (e) => {
    e.stopPropagation()
    alert('click')
  }

  const onDeleteButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteUncheckedRows(rows))
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
        <button type="button" onClick={onDeleteButtonHandler}>Delete unchecked</button>
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
