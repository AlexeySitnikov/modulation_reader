import { useState } from 'react'
import './App.css'
import { ListOfValues } from './components/ListOfValues'

function App() {
  const [listOfvariables, setListOfVariables] = useState()

  let arrayOfStrings = []

  const clickHandlerFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0])
      reader.onload = () => {
        arrayOfStrings = reader.result
          .replace(/[-]/g, '')
          .split('\n')
          .map((el) => el.trim())
          .map((el) => el.replace(/\s\s+/g, ' '))
        for (let i = 0; i < arrayOfStrings.length; i += 1) {
          // console.log(arrayOfStrings[i])
        }
        // console.log(arr[1].split(' '))
        // console.log(arrayOfStrings)
        setListOfVariables(arrayOfStrings[0])
      }
    }
  }
  // console.log(listOfvariables)

  return (
    <>
      <input type="file" onChange={clickHandlerFileChange} />
      <ListOfValues listOfvariables={listOfvariables} />
    </>
  )
}

export default App
