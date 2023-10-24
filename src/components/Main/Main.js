import { useEffect, useState } from 'react'
import { ListOfValues } from '../ListOfValues'

export function Main({ selectedFile }) {
  const [listOfvariables, setListOfVariables] = useState([])
  useEffect(() => {
    let arrayOfStrings = []
    if (selectedFile) {
      const reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = () => {
        arrayOfStrings = reader.result
          .replace(/[-]/g, '')
          .split('\n')
          .map((el) => el.trim())
          .map((el) => el.replace(/\s\s+/g, ' '))
        setListOfVariables([...arrayOfStrings])
      }
    }
  }, [selectedFile])

  if (!listOfvariables) {
    return (
      <div>
        no data
      </div>
    )
  }

  return (
    <ListOfValues listOfvariables={listOfvariables} />
  )
}
