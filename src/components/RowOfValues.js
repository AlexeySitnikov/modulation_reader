import { SingleValue } from './SingleValue'
import style from './styles.module.css'

export function RowOfValues({ index, element }) {
  const onClickRow = (e) => {
    e.stopPropagation()
    console.log(index)
  }

  return (
    <div className={style.listOfVariables}>
      <input type="checkbox" onClick={onClickRow} />
      {element.split(' ').map((el) => (<SingleValue key={crypto.randomUUID()} variable={el} />))}
    </div>
  )
}
