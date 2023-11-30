// import Form from './page/Form'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ClassTable from './page/ClassTable'
import StudentTable from './page/StudentTable'
import CoachTable from './page/CoachTable'
import Revenue from './page/Revenue'

import ClassForm from './page/ClassForm'
import StudentForm from './page/StudentForm'
import CoachFrom from './page/CoachForm'

import ClassDetail from './page/ClassDetail'
import CoachDetail from './page/CoachDetail'
import StudentDetail from './page/StudentDetail'

import StuDataModify from './page/StuDataModify'
import CoachDataModify from './page/CoachDataModify'

import {newData} from './page/Revenue'
import RevenueCourseType from './page/RevenueCourseType'
import RevenueCoach from './page/RevenueCoach'

//json test data
import classes from './json/class.json'
import testClass from './json/test_class.json'
import newJson from './json/new_class.json'
//test page
import SaveJsonPage from './page/SaveJsonPage'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setFileName } from './redux/reducers/saveSlice'
import { setHasinit } from './redux/reducers/saveSlice'
import { selectFileName } from './redux/reducers/saveSlice'
import { selectHasInit } from './redux/reducers/saveSlice'
//time check
import { DateTime } from 'luxon'

//import logo
import Logo from './images/logo.png'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  //save file function & read function
  const [menuInfo, setMenuInfo] = useState('AzusaSavedFile')
  const [filePathInfo, setFilePathInfo] = useState('')
  //const [fileContent, setFileContent] = useState('')
  const dispatch = useDispatch()

  //use redux state variable
  //const fileContent = useSelector(selectFileName)
  // const hasInit = useSelector(selectHasInit)
  const fileContent = useSelector((state) => state.root.save.fileName)
  const hasInit = useSelector((state) => state.root.save.hasInit)
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
    //setFileContent(content)
    dispatch(setFileName(content))
  }

  //ready to close window and save file

  const onReadyToCloseWindows = async () => {
    console.log('onReadyfileContent:', fileContent)
    console.log('onReadyfileContentjson:', fileContent.newJsonData, !!fileContent.newJsonData)
    if (!!fileContent?.newJsonData) {
      console.log('fileContentjson:', fileContent)
      const data = JSON.stringify(fileContent)
      await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
    }
    await window.api.closeWindow()
  }

  const onInitState = async () => {
    try {
      const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
        menuInfo: 'no data'
      }
      const content = JSON.parse(data)
      if (content){
      dispatch(setFileName(content))
      }
    } catch (err) {
      console.log('沒有檔案可以讀取')
    }
  }

  console.log('is init in appjsx??:', hasInit)

  useEffect(() => {
    if (!hasInit) {
      dispatch(setHasinit(true))
      onInitState()
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
    })
    ipcRenderer.on('readyToClose', (_) => {
      console.log('ready to close', fileContent)
      onReadyToCloseWindows()
    })
    //now use hasInit flag to stop listening
    // return () => {
    //   ipcRenderer.removeAllListeners('menuInfo')
    //   ipcRenderer.removeAllListeners('filePathInfo')
    // }
  }, [])

  console.log('fileContent:', fileContent)

  return isLoading || !fileContent.newJsonData ? (
    <div className='enterPage'>
      <img src={Logo} style={{ width: '160px', height: '160px' }} alt="Azusa" />
      <div></div>
      <span style={{color:"#DFC994", fontSize:"20px"}}>載入檔案中...</span>
    </div>
  ) : (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/classes" />} />
        <Route path="/classes" element={<ClassTable classes={fileContent.newJsonData} />} />
        <Route path="/student" element={<StudentTable classes={fileContent.newJsonData} />}></Route>
        {/* <Route path="/coach" element={<CoachTable classes={newJson} />} /> */}
        <Route path="/coach" element={<CoachTable classes={fileContent.newJsonData} />} />
        <Route path="/revenue" element={<Revenue classes={fileContent.newJsonData} />} />

        <Route path="/classes">
          <Route path="form" element={<ClassForm classes={fileContent.newJsonData}/>} />
          <Route path="id/:id" element={<ClassDetail classes={fileContent.newJsonData}/>} />
        </Route>

        <Route path="/student">
          <Route path="form" element={<StudentForm classes={fileContent.newJsonData} />} />
          <Route path="name/:stuID" element={<StudentDetail classes={fileContent.newJsonData} />} />
          <Route path="modify/:stuID" element={<StuDataModify classes={fileContent.newJsonData}/>} />
        </Route>

        <Route path="/coach">
          <Route path="form" element={<CoachFrom classes={fileContent.newJsonData} />} />
          {/* <Route path="name/:coachID" element={<CoachDetail classes={newJson} />} /> */}
          <Route path="name/:coachID" element={<CoachDetail classes={fileContent.newJsonData} />} />
          <Route path="modify/:coachID" element={<CoachDataModify classes={fileContent.newJsonData}/>} />
        </Route>

        <Route path="/revenue">
          {/* <Route path="courseType/:courseID" element={<RevenueCourseType classes={fileContent.newJsonData} />} />
          <Route path="coach/:coachID" element={<RevenueCoach classes={fileContent.newJsonData}/>} /> */}
          <Route path="courseType/:courseID" element={<RevenueCourseType classes={newData} />}/>
          <Route path="coach/:coachID" element={<RevenueCoach classes={fileContent.newJsonData}/>} />
        </Route>

        <Route path="/savejson" element={<SaveJsonPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
