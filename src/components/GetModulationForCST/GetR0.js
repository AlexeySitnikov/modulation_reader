import { Radius } from '../ModulationForCST/Radius'
import style from './style.module.css'

export function GetR0({ rows }) {
  return (
    <button className={style.button} type="button" onClick={() => { Radius({ rows }) }}>
      Download R
    </button>
  )
}
