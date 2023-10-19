import { useEffect, useState } from 'react'
import { ListOfValues } from './components/ListOfValues'
import { DownloadFile } from './components/DownloadFile/DownloadFile'

function App() {
  const [listOfvariables, setListOfVariables] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

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

  if (listOfvariables.length === 0) {
    return (
      <DownloadFile setSelectedFile={setSelectedFile} />
    )
  }

  return (
    <>
      {/* <DownloadFile setSelectedFile={setSelectedFile} /> */}
      <ListOfValues listOfvariables={listOfvariables} />
    </>
  )
}

export default App
