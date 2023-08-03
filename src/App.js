/* eslint-disable jsx-a11y/anchor-is-valid */
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
        setListOfVariables(arrayOfStrings)
      }
    }
  }

  if (!listOfvariables) {
    return (
      <>
        <input type="file" onChange={clickHandlerFileChange} />
        <div>
          no data
        </div>
      </>
    )
  }

  return (
    <>
      {/* <a id="downloadLink" href="#" onClick={() => { download([1]) }}>Download</a> */}
      <input type="file" onChange={clickHandlerFileChange} />
      <ListOfValues listOfvariables={listOfvariables} />
    </>
  )
}

export default App
