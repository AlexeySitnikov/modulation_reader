import React, { useContext, useMemo, useState } from 'react'

const ModulationByPointsContext = React.createContext()
const ModulationByPointsContextChangeValue = React.createContext()

export function ModulationContextProvider({ children }) {
  const [step, setStep] = useState(0.25)
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
    <ModulationByPointsContext.Provider value={modulationParametersValue}>
      <ModulationByPointsContextChangeValue.Provider value={modulationParametersChangeValue}>
        {children}
      </ModulationByPointsContextChangeValue.Provider>
    </ModulationByPointsContext.Provider>
  )
}

export const useModulationContext = () => useContext(ModulationByPointsContext)
export const useModulationContextChangeValue = () => useContext(
  ModulationByPointsContextChangeValue,
)
