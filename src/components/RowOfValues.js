import { useDispatch } from 'react-redux'
import { addRow, removeRow } from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { SingleValue } from './SingleValue'
import style from './styles.module.css'

export function RowOfValues({ element }) {
  const dispatch = useDispatch()

  const onClickRow = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      dispatch(addRow(element))
    } else {
      dispatch(removeRow(element))
    }
  }

  return (
    <div className={style.listOfVariables}>
      <input type="checkbox" onClick={onClickRow} defaultChecked={element.checked} />
      {element.element.split(' ').map((el) => (<SingleValue key={crypto.randomUUID()} variable={el} />))}
    </div>
  )
}
