import './App.css'

function App() {
  let arrayOfStrings = []
  const clickHandlerFileChange = (e) => {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.onload = () => {
      arrayOfStrings = reader.result
        .replace(/[-]/g, '')
        .split('\n')
        .map((el) => el.trim())
        .map((el) => el.replace(/\s\s+/g, ' '))
      for (let i = 0; i < arrayOfStrings.length; i += 1) {
        console.log(arrayOfStrings[i])
      }

      // console.log(arr[1].split(' '))
    }
  }

  return (
    <input type="file" onChange={clickHandlerFileChange} />
  )
}

export default App
