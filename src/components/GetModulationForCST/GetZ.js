import { ZLength } from '../ModulationForCST/ZLength'

export function GetZ({ rows }) {
  return (
    <button
      type="button"
      onClick={() => {
        ZLength({ rows })
      }}
    >
      Download Z
    </button>
  )
}
