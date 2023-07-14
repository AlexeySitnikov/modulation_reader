import { NameOfValues } from './NameOfValues'
import style from './styles.module.css'

export function RowOfCheckBox({ firstRow }) {
  return (
    <div className={style.containerCheckbox}>
      {firstRow.split(' ').map((el, index) => (
        <div className={style.checkbox} key={crypto.randomUUID()}>
          <NameOfValues key={crypto.randomUUID()} nameOfValue={el} index={index} />
        </div>
      ))}
    </div>
  )
}
