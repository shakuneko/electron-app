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


import classes from './json/class.json'
import testClass from './json/test_class.json'
import newJson from './json/new_class.json'

import SaveJsonPage from './page/SaveJsonPage'
//redux
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
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
            <Route path="form" element={<CoachFrom classes={classes}/>} />
            <Route path="name/:coachID" element={<CoachDetail classes={newJson}  />} />
          </Route>


          <Route path="/savejson" element={<SaveJsonPage />} />
        </Routes>
      </HashRouter>

  )
}

export default App
