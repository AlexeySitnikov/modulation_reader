import { useDispatch } from 'react-redux'
import { addRow } from './Redux/Slices/checkRowSlice/checkRowSlice'
import { SingleValue } from './SingleValue'
import style from './styles.module.css'

export function RowOfValues({ index, element }) {
  const dispatch = useDispatch()
  const onClickRow = (e) => {
    e.stopPropagation()
    // e.preventDefault()
    console.log(`from event ${index}`)
    dispatch(addRow(index))
  }

  return (
    <div className={style.listOfVariables}>
      <input type="checkbox" onClick={onClickRow} />
      {element.split(' ').map((el) => (<SingleValue key={crypto.randomUUID()} variable={el} />))}
    </div>
  )
}
