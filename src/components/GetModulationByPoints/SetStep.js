import { useRef } from 'react'
import { useModulationContext, useModulationContextChangeValue } from '../Contexts/ModulationByPointsContext'
import style from './style.module.css'

export function SetStep() {
  const { step, dimension } = useModulationContext()
  const { setStep } = useModulationContextChangeValue()
  const inputRef = useRef(null)

  const onClickHandler = () => {
    setStep(inputRef.current.value)
  }

  return (
    <>
      <input className={style.input} type="number" min={0} step={0.01} onChange={onClickHandler} value={step} ref={inputRef} lang="en-US" />
      <button className={style.button} type="button">
        {`Current step is ${step} ${dimension}`}
      </button>
    </>
  )
}
