import { ModulationContextProvider } from '../Contexts/ModulationContext'
import { GetHorizontalModulation } from './GetHorizontalModulation'
import { GetVerticalModulation } from './GetVerticalModulation'
import { SetDimension } from './SetDimension'
import { SetStep } from './SetStep'
import style from './form.module.css'

export function Form({ rows }) {
  return (
    <ModulationContextProvider>
      <div className={style.formWrapper}>
        <SetStep />
        <SetDimension />
        <GetVerticalModulation rows={rows} />
        <GetHorizontalModulation rows={rows} />
      </div>
    </ModulationContextProvider>
  )
}
