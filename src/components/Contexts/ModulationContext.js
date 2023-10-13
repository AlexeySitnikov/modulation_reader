import React, { useContext, useMemo, useState } from 'react'

const ModulationContext = React.createContext()
const ModulationContextChangeValue = React.createContext()

export function ModulationContextProvider({ children }) {
  const [step, setStep] = useState(0.5)
  const [dimension, setDimension] = useState('mm')

  const modulationParametersValue = useMemo(() => ({
    step,
    dimension,
  }), [step, dimension])

  const modulationParametersChangeValue = useMemo(() => ({
    setStep,
    setDimension,
  }), [])

  return (
    <ModulationContext.Provider value={modulationParametersValue}>
      <ModulationContextChangeValue.Provider value={modulationParametersChangeValue}>
        {children}
      </ModulationContextChangeValue.Provider>
    </ModulationContext.Provider>
  )
}

export const useModulationContext = () => useContext(ModulationContext)
export const useModulationContextChangeValue = () => useContext(ModulationContextChangeValue)
