import { SingleValue } from './SingleValue'
import style from './styles.module.css'

export function RowOfValues({ element }) {
  return (
    <div className={style.listOfVariables}>
      {element.split(' ').map((el) => (<SingleValue key={crypto.randomUUID()} variable={el} />))}
    </div>
  )
}
