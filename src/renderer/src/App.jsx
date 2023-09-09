// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Table from './page/Table'
import StudentTable from './page/StudentTable'
import CoachTable from './page/CoachTable'
import Revenue from './page/Revenue'

import StudentForm from './page/StudentForm'
import CoachFrom from './page/CoachForm'

import classes from './json/class.json'



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Table classes={classes}/>} />
        <Route path="/student" element={<StudentTable classes={classes}/>} />
        <Route path="/coach" element={<CoachTable classes={classes}/>} />
        <Route path="/revenue" element={<Revenue classes={classes}/>} />

        <Route path="/form" element={<Form />} />
        <Route path="/studentform" element={<StudentForm classes={classes}/>} />
        <Route path="/coachform" element={<CoachFrom classes={classes}/>} />
        
      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
