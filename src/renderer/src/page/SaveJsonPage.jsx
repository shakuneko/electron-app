import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

import jsonData from '../json/class.json'

function SaveJsonPage() {
  const [menuInfo, setMenuInfo] = useState('Loading')
  const [filePathInfo, setFilePathInfo] = useState('')
  const [fileContent, setFileContent] = useState('')
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    const data = JSON.stringify({ jsonData })
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }

  const onReadFile = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    setFileContent(content.menuInfo)
  }

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
    })
  }, [])

console.log(fileContent)


  return (
    <div className="row row-no-gutter margin-left-right container-fluid">
      <div className="nav col-2">
        <Navbar />
      </div>
      <div className="col-10 container margin-left-right">
        <div className="mt-4 table-container">
          <h3> 點擊下方按鈕存檔</h3>
          <h3>檔名：{menuInfo}</h3>
          <div
            style={{
              marginTop: '20px',
              border: '1px solid lightgray',
              borderRadius: '5px',
              fontSize: '40px',
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={onSaveToFile}
          >
            save to file
          </div>
          <h3>檔案存於： {filePathInfo} </h3>

      <div
        style={{
          marginTop: '20px',
          border: '1px solid lightgray',
          fontSize: '40px',
          padding: '10px',
          cursor: 'pointer',
          textAlign: 'center'
        }}
        onClick={onReadFile}
      >
        read from file
      </div>
      <h2>file content = {fileContent} </h2>

     


        </div>
      </div>
    </div>
  )
}

export default SaveJsonPage
