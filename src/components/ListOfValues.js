import { RowOfCheckBox } from './RowOfCheckBox'
import { RowOfValues } from './RowOfValues'
import style from './styles.module.css'

export function ListOfValues({ listOfvariables }) {
  if (!listOfvariables) {
    return (
      <div>
        no data
      </div>
    )
  }
  return (
    <div className={style.column}>
      {/* <div className={style.checkbox}>
        {listOfvariables[0].split(' ').map(() => (
          <input type="checkbox" key={crypto.randomUUID()} />
        ))}
      </div> */}
      {listOfvariables
        .filter((el) => el.length > 0)
        .map((el, index) => (
          (index === 0)
            ? (
              <RowOfCheckBox key={crypto.randomUUID()} firstRow={el} />
            )
            : <RowOfValues key={crypto.randomUUID()} index={index} element={el} />
        ))}
    </div>
  )
}
