import { useDispatch } from 'react-redux'
import style from './styles.module.css'
import { addColumn, removeColumn } from './Redux/Slices/columnCheckSlice/columnCheckSlice'

export function NameOfValues({ nameOfValue, index }) {
  const dispatch = useDispatch()
  const checkAllColumns = document.getElementById('checkAllColumns')
  const isCheckAllColumns = checkAllColumns ? checkAllColumns.checked : false
  if (isCheckAllColumns) {
    dispatch(addColumn({ nameOfValue, index }))
  }

  const onClickColumn = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      dispatch(addColumn({ nameOfValue, index }))
    } else {
      dispatch(removeColumn(index))
    }
  }

  return (
    <div className={style.values}>
      <input type="checkbox" onClick={onClickColumn} defaultChecked={checkAllColumns ? checkAllColumns.checked : false} />
      {nameOfValue}
    </div>
  )
}
