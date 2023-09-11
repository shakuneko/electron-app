// import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ClassTable from './page/ClassTable'
import StudentTable from './page/StudentTable'
import CoachTable from './page/CoachTable'
import Revenue from './page/Revenue'

import ClassForm from './page/ClassForm'
import StudentForm from './page/StudentForm'
import CoachFrom from './page/CoachForm'

import ClassDetail from "./page/ClassDetail";
import CoachDetail from './page/CoachDetail';
import StudentDetail from './page/StudentDetail';

import classes from './json/class.json'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ClassTable classes={classes}/>} />
        <Route path="/student" element={<StudentTable classes={classes}/>} />
        <Route path="/coach" element={<CoachTable classes={classes}/>} />
        <Route path="/revenue" element={<Revenue classes={classes}/>} />

        {/* <Route path="/form" element={<Form />} /> */}
        <Route path="/form" element={<ClassForm />} />
        <Route path="/studentform" element={<StudentForm classes={classes}/>} />
        <Route path="/coachform" element={<CoachFrom classes={classes}/>} />

        <Route path="/classdetail" element={<ClassDetail classes={classes}/>} />
        <Route path="/coachdetail" element={<CoachDetail classes={classes}/>} />
        <Route path="/studentdetail" element={<StudentDetail classes={classes}/>} />
      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
