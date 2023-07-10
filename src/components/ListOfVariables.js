import { Variable } from './Variable'
import style from './styles.module.css'

export function ListOfVariables({ arrayOfNames }) {
  return (
    <div className={style.listOfVariables}>
      {arrayOfNames.map((el) => <Variable key={crypto.randomUUID()} variable={el} />)}
    </div>
  )
}
