// import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  //save file function & read function
  const [menuInfo, setMenuInfo] = useState('AzusaSavedFile')
  const [filePathInfo, setFilePathInfo] = useState('')
  //const [fileContent, setFileContent] = useState('')
  const dispatch = useDispatch()

  //use redux state variable
  // const fileContent = useSelector(selectFileName)
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

  const onInitState = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    dispatch(setFileName(content))
  }


  console.log("fileContentjson:", fileContent.testModified)
  console.log("is init??:", hasInit)

  useEffect(() => {
    if (!hasInit) {
      dispatch(setHasinit(true))
      onInitState()
    }
  }, [])

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

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ClassTable />} />
        <Route path="/student" element={<StudentTable />}></Route>
        <Route path="/coach" element={<CoachTable classes={newJson} />} />
        <Route path="/revenue" element={<Revenue classes={classes} />} />

        <Route path="classes">
          <Route path="form" element={<ClassForm />} />
          <Route path="id/:id" element={<ClassDetail />} />
        </Route>

        <Route path="/student">
          <Route path="form" element={<StudentForm />} />
          <Route path="name/:stuID" element={<StudentDetail />} />
        </Route>

        <Route path="/coach">
          <Route path="form" element={<CoachFrom classes={classes} />} />
          <Route path="name/:coachID" element={<CoachDetail classes={newJson} />} />
        </Route>

        <Route path="/savejson" element={<SaveJsonPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
