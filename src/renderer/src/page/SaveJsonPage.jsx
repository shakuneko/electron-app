import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

import jsonData from '../json/class.json'
import newJsonData from '../json/new_class.json'
import { useSelector, useDispatch } from 'react-redux'
//for time
import { DateTime } from 'luxon'

function SaveJsonPage() {
  const [menuInfo, setMenuInfo] = useState('AzusaSavedFile')
  const [filePathInfo, setFilePathInfo] = useState('')
  const [fileContent, setFileContent] = useState('')
  const { ipcRenderer } = window.electron
  const fileContentFromRedux = useSelector((state) => state.root.save.fileName)

  const onSaveToFile = async () => {
    const data = JSON.stringify({ newJsonData })
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }

  const onReadFile = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    setFileContent(content)
  }
  //console.log(fileContent)

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
    })
    return () => {
      ipcRenderer.removeAllListeners('menuInfo')
      ipcRenderer.removeAllListeners('filePathInfo')
    }
  }, [])

  //get time
  // 获取当前日期和时间
  const currentDateTime = DateTime.now()
  // 格式化日期为 "2022/03/03" 格式
  const formattedDate = currentDateTime.toFormat('yyyy/MM/dd')
  //console.log('当前日期：', formattedDate)

  return (
    <div className="row row-no-gutter margin-left-right container-fluid">
      <div className="nav col-2">
        <Navbar />
      </div>
      <div className="col-10 container margin-left-right">
        <div className="mt-4 table-container">
          <div>{formattedDate}</div>
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
          <h2>contentOldJson:</h2>
          <div> {JSON.stringify(newJsonData)}</div>
          <h2>content:</h2>
          <div>{JSON.stringify(fileContent.testModified)}</div>

          <h2>redux content:</h2>
          <div>{JSON.stringify(fileContentFromRedux.newJsonData)}</div>
        </div>
      </div>
    </div>
  )
}

export default SaveJsonPage
