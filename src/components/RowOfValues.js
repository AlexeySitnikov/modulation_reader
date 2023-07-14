import { useDispatch } from 'react-redux'
import { addRow, removeRow } from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { SingleValue } from './SingleValue'
import style from './styles.module.css'

export function RowOfValues({ index, element }) {
  const dispatch = useDispatch()
  const checkAllRows = document.getElementById('checkAllRows')
  const isCheckAllRows = checkAllRows ? checkAllRows.checked : false
  if (isCheckAllRows) {
    dispatch(addRow({ element, index }))
  }
  const onClickRow = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      dispatch(addRow({ element, index }))
    } else {
      dispatch(removeRow(index))
    }
  }

  return (
    <div className={style.listOfVariables}>
      <input type="checkbox" onClick={onClickRow} defaultChecked={checkAllRows ? checkAllRows.checked : false} />
      {element.split(' ').map((el) => (<SingleValue key={crypto.randomUUID()} variable={el} />))}
    </div>
  )
}
