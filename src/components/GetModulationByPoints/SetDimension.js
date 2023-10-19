import { Dimension } from './Dimension'
import { useModulationContext, useModulationContextChangeValue } from '../Contexts/ModulationByPointsContext'
import style from './style.module.css'

export function SetDimension() {
  const dimensionArray = ['mm', 'cm', 'dm', 'm']
  const { dimension } = useModulationContext()
  const { setDimension } = useModulationContextChangeValue()
  const onSelectHandler = (e) => {
    setDimension(e.target.value)
  }

  return (
    <select onChange={onSelectHandler} value={dimension} className={style.selector}>
      {dimensionArray.map((el) => (
        <Dimension dimension={el} key={crypto.randomUUID()} />
      ))}
    </select>
  )
}
