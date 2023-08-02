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

  const onSaveFileButtonHandler = () => {
    const massiv = ['efim360.ru', 'помог', 'мне', 'решить', 'задачу']
    const blob = new Blob([JSON.stringify(massiv)], { type: 'text/plain' })
    const link = document.createElement('a')
    link.setAttribute('href', URL.createObjectURL(blob))
    link.setAttribute('download', 'my-array.txt')
  }
  // link.click()

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
      <a id="downloadLink" href="#" download="myFile.txt" onClick={onSaveFileButtonHandler}>Download</a>
      <input type="file" onChange={clickHandlerFileChange} />
      <ListOfValues listOfvariables={listOfvariables} />
    </>
  )
}

export default App
