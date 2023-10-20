import { ModulationContextProvider } from '../Contexts/ModulationByPointsContext'
import { GetHorizontalModulation } from './GetHorizontalModulation'
import { GetVerticalModulation } from './GetVerticalModulation'
import { SetDimension } from './SetDimension'
import { SetStep } from './SetStep'
import style from './style.module.css'

export function GetModulationByPoints({ rows }) {
  return (
    <ModulationContextProvider>
      <div className={style.formWrapper}>
        <div>
          <SetStep />
          <SetDimension />
        </div>
        <div>
          <GetVerticalModulation rows={rows} />
          <GetHorizontalModulation rows={rows} />
        </div>
      </div>
    </ModulationContextProvider>
  )
}
