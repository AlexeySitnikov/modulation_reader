import { useEffect, useState } from 'react'
import style from './App.css'
import { ListOfValues } from './components/ListOfValues'
import { DownloadFile } from './components/DownloadFile/DownloadFile'

function App() {
  const [listOfvariables, setListOfVariables] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [preparedRows, setPreparedRows] = useState([])

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
      // setPreparedRows([...listOfvariables.filter((el) => el.length > 0)
      //   .map((element) => (
      //     {
      //       element,
      //       checked: false,
      //       id: crypto.randomUUID(),
      //     }
      //   ))])
    }
  }, [selectedFile])

  useEffect(() => {
    setPreparedRows([...listOfvariables.filter((el) => el.length > 0)
      .map((element) => (
        {
          element,
          checked: false,
          id: crypto.randomUUID(),
        }
      )),
    ])
  }, [listOfvariables])

  if (listOfvariables.length === 0) {
    return (
      <div className={style.singleElementWrapper}>
        <DownloadFile setSelectedFile={setSelectedFile} />
      </div>
    )
  }
  return (
    <>
      <div className={style.asd}>
        <DownloadFile setSelectedFile={setSelectedFile} />
      </div>
      <div>
        <ListOfValues preparedRows={preparedRows} setPreparedRows={setPreparedRows} />
      </div>
    </>
  )
}

export default App
