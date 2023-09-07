import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

import jsonData from '../json/class.json'

function SaveJsonPage() {
  const [menuInfo, setMenuInfo] = useState('SavedFileAzusa')
  const [filePathInfo, setFilePathInfo] = useState('')
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    const data = JSON.stringify({ jsonData })
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
    })
  }, [])
  return (
    <div className="container">
        <Navbar />
      <h1>{menuInfo} is clicked...</h1>
      <div
        style={{
          marginTop: '20px',
          border: '1px solid lightgray',
          fontSize: '40px',
          padding: '10px',
          cursor: 'pointer',
          textAlign: 'center'
        }}
        onClick={onSaveToFile}
      >
        save to file
      </div>
      <h2>file write to {filePathInfo} </h2>
    </div>
  )
}

export default SaveJsonPage
