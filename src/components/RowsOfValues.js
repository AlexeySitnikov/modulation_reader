import { RowOfValues } from './RowOfValues'

export function RowsOfValues({ rows }) {
  return (
    <div>
      {rows.map((element) => (
        <RowOfValues key={crypto.randomUUID()} element={element} />
      ))}
    </div>
  )
}
