import { ZLength } from '../ModulationForCST/ZLength'
import style from './style.module.css'

export function GetZ({ rows }) {
  return (
    <button className={style.button} type="button" onClick={() => { ZLength({ rows }) }}>
      Download Z
    </button>
  )
}
