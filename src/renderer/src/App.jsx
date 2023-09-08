// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'

import classes from "./json/class.json"

import Table from "./page/Table"
import StudentTable from "./page/StudentTable"
import CoachTable from "./page/CoachTable"

import ClassDetail from "./page/ClassDetail";
import CoachDetail from './page/CoachDetail';
import StudentDetailPage from './page/StudentDetailPage';

import Form from './page/Form'
import StudentForm from './page/StudentForm'
import CoachFrom from './page/CoachForm'

import Revenue from './page/Revenue';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/form" element={<Table classes={classes}/>} />
        <Route path="/student" element={<StudentTable classes={classes}/>} />
        <Route path="/coach" element={<CoachTable classes={classes}/>} />

        <Route path="/classdetail" element={<ClassDetail classes={classes}/>} />
        <Route path="/coachdetail" element={<CoachDetail classes={classes}/>} />
        <Route path="/studentdetail" element={<StudentDetailPage classes={classes}/>} />

        <Route path="/" element={<Form />} />
        <Route path="/studentform" element={<StudentForm classes={classes}/>} />
        <Route path="/coachform" element={<CoachFrom classes={classes}/>} />

        <Route path="/revenue" element={<Revenue classes={classes}/>} />

      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
