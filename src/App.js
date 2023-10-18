/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react'
import style from './style.module.css'
import { ListOfValues } from './components/ListOfValues'
import filePickerLogo from './Pics/1.png'

function App() {
  const pickerRef = useRef(null)
  const [listOfvariables, setListOfVariables] = useState([])
  const [file, setFile] = useState(null)

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
      setFile(e.target.files[0])
    }
    console.log(file)
  }

  const pickFileHandler = () => {
    pickerRef.current.click()
  }

  if (!listOfvariables) {
    return (
      <div className={style.wrapper}>
        <button type="button" onClick={pickFileHandler}>
          <img className={style.filePicker} src={filePickerLogo} alt="filePickerLogo" />
        </button>
        <input type="file" onChange={clickHandlerFileChange} ref={pickerRef} className={style.hiddenInput} />

      </div>
    )
  }

  return (
    <>
      {/* <a id="downloadLink" href="#" onClick={() => { download([1]) }}>Download</a> */}
      {/* <input type="file" onChange={clickHandlerFileChange} /> */}
      <ListOfValues listOfvariables={listOfvariables} />
    </>
  )
}

export default App
