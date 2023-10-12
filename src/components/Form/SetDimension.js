import { Dimension } from './Dimension'

export function SetDimension() {
  const dimensionArray = ['mm', 'cm', 'm']

  return (
    <select>
      {dimensionArray.map((el) => (
        <Dimension dimension={el} key={crypto.randomUUID()} />
      ))}
    </select>
  )
}
