import { ModulationContextProvider } from '../Contexts/ModulationByPointsContext'
import { GetHorizontalModulation } from './GetHorizontalModulation'
import { GetVerticalModulation } from './GetVerticalModulation'
import { SetDimension } from './SetDimension'
import { SetStep } from './SetStep'
import style from './form.module.css'

export function GetModulationByPoints({ rows }) {
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
