import { GetM } from './GetM'
import { GetR0 } from './GetR0'
import { GetZ } from './GetZ'
import style from './form.module.css'

export function GetModulationForCST({ rows }) {
  return (
    <div className={style.formWrapper}>
      <GetM rows={rows} />
      <GetR0 rows={rows} />
      <GetZ rows={rows} />
    </div>
  )
}
