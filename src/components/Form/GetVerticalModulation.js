import { VerticalModulation } from '../ModulationByPoints/VerticalModulation'
import { useModulationContext } from '../Contexts/ModulationContext'

export function GetVerticalModulation({ rows }) {
  const { step, dimension } = useModulationContext()
  return (
    <button
      type="button"
      onClick={() => {
        VerticalModulation({ rows, step, dimension })
      }}
    >
      Get vertical modulation
    </button>
  )
}
