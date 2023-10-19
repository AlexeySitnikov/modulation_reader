import style from './style.module.css'
import { Modulation } from '../ModulationForCST/Modulation'

export function GetM({ rows }) {
  return (
    <button className={style.button} type="button" onClick={() => { Modulation({ rows }) }}>
      Download m
    </button>
  )
}
