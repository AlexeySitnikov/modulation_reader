import { useRef } from 'react'
import { useModulationContext, useModulationContextChangeValue } from '../Contexts/ModulationContext'

export function SetStep() {
  const { step } = useModulationContext()
  const { setStep } = useModulationContextChangeValue()
  const inputRef = useRef(null)

  const onClickHandler = () => {
    setStep(inputRef.current.value)
  }

  return (
    <>
      <input ref={inputRef} value={step} onChange={onClickHandler} />
      <button type="button" onClick={onClickHandler}>Set step</button>
    </>
  )
}
