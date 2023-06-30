import './App.css'

function App() {
  const clickHandlerFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      console.log(reader.result)
    }
  }

  return (
    <input type="file" onChange={clickHandlerFileChange} />
  )
}

export default App
