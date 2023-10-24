import { SingleRow } from '../SingleRow/SingleRow'

export function ListOfRows({ rows, checkRow }) {
  return (
    <div>
      {rows.map((row) => <SingleRow key={crypto.randomUUID()} row={row} checkRow={checkRow} />)}
    </div>
  )
}
