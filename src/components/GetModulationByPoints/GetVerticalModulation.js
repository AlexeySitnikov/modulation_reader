import { VerticalModulation } from '../ModulationByPoints/VerticalModulation'
import { useModulationContext } from '../Contexts/ModulationByPointsContext'
import style from './style.module.css'

export function GetVerticalModulation({ rows }) {
  const { step, dimension } = useModulationContext()
  return (
    <button
      className={style.button}
      type="button"
      onClick={() => {
        VerticalModulation({ rows, step, dimension })
      }}
    >
      Get vertical modulation
    </button>
  )
}
