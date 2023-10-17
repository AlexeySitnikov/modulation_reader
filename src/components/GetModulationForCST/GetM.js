import { Modulation } from '../ModulationForCST/Modulation'

export function GetM({ rows }) {
  return (
    <button type="button" onClick={() => { Modulation({ rows }) }}>
      Download m
    </button>
  )
}
