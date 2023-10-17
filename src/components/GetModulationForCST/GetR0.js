import { Radius } from '../ModulationForCST/Radius'

export function GetR0({ rows }) {
  return (
    <button
      type="button"
      onClick={() => {
        Radius({ rows })
      }}
    >
      Download R
    </button>
  )
}
