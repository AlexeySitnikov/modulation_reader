import { HorizontalModulation } from '../ModulationByPoints/HorizontalModulation'
import { useModulationContext } from '../Contexts/ModulationByPointsContext'
import style from './style.module.css'

export function GetHorizontalModulation({ rows }) {
  const { step, dimension } = useModulationContext()
  return (
    <button
      className={style.button}
      type="button"
      onClick={() => {
        HorizontalModulation({ rows, step, dimension })
      }}
    >
      Get horizontal modulation
    </button>
  )
}
