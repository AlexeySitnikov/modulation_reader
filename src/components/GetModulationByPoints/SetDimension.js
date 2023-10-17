import { Dimension } from './Dimension'
import { useModulationContext } from '../Contexts/ModulationByPointsContext'

export function SetDimension() {
  const dimensionArray = ['mm', 'cm', 'm']
  const { dimension } = useModulationContext()

  return (
    <select defaultValue={dimension}>
      {dimensionArray.map((el) => (
        <Dimension dimension={el} key={crypto.randomUUID()} />
      ))}
    </select>
  )
}
