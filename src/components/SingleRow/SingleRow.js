import { SingleValue } from '../SingleValue/SingleValue'
import style from './style.module.css'

export function SingleRow({ row, checkRow }) {
  const onClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    checkRow(row.id)
  }

  return (
    <div className={style.variable}>
      <input type="checkbox" onChange={onClickHandler} checked={row.checked} />
      {row.element.split(' ').map((el) => (
        <SingleValue
          key={crypto.randomUUID()}
          value={el}
        />
      ))}
    </div>
  )
}
