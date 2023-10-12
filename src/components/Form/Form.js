import { GetHorizontalModulation } from './GetHorizontalModulation'
import { GetVerticalModulation } from './GetVerticalModulation'
import { SetDimension } from './SetDimension'
import { SetStep } from './SetStep'
import style from './form.module.css'

export function Form() {
  return (
    <div className={style.formWr}>
      <SetStep />
      <SetDimension />
      <GetVerticalModulation />
      <GetHorizontalModulation />
    </div>
  )
}
