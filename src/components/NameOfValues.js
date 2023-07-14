import { useDispatch } from 'react-redux'
import style from './styles.module.css'
import { addColumn, removeColumn } from './Redux/Slices/columnCheckSlice/columnCheckSlice'

export function NameOfValues({ nameOfValue, index }) {
  const dispatch = useDispatch()

  const onClickColumn = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      console.log(nameOfValue, index)
      dispatch(addColumn({ nameOfValue, index }))
    } else {
      dispatch(removeColumn(index))
    }
  }

  return (
    <div className={style.values}>
      <input type="checkbox" onClick={onClickColumn} />
      {nameOfValue}
    </div>
  )
}
