import { HorizontalModulation } from '../ModulationByPoints/HorizontalModulation'
import { useModulationContext } from '../Contexts/ModulationByPointsContext'

export function GetHorizontalModulation({ rows }) {
  const { step, dimension } = useModulationContext()
  return (
    <button
      type="button"
      onClick={() => {
        HorizontalModulation({ rows, step, dimension })
      }}
    >
      Get horizontal modulation
    </button>
  )
}
