import { NameOfValues } from './NameOfValues'
import style from './styles.module.css'

export function RowOfCheckBox({ firstRow }) {
  return (
    <div className={style.containerCheckbox}>
      {firstRow.split(' ').map((el) => (
        <div className={style.checkbox} key={crypto.randomUUID()}>
          <input type="checkbox" />
          <NameOfValues key={crypto.randomUUID()} nameOfValues={el} />
        </div>
      ))}
    </div>
  )
}
