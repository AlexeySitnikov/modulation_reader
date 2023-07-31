import { RowOfValues } from './RowOfValues'

export function RowsOfValues({ rows }) {
  return (
    <div>
      {rows.map((el, index) => (
        <RowOfValues key={crypto.randomUUID()} index={index} element={el} />
      ))}
    </div>
  )
}
