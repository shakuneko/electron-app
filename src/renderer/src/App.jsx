
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table classes={classes}/>} />
        <Route path="/student" element={<StudentTable classes={classes}/>} />
        <Route path="/coach" element={<CoachTable classes={classes}/>} />

        <Route path="/classdetail" element={<ClassDetail classes={classes}/>} />
        <Route path="/coachdetail" element={<CoachDetail classes={classes}/>} />
        <Route path="/studentdetail" element={<StudentDetailPage classes={classes}/>} />

        <Route path="/form" element={<Form />} />
        <Route path="/studentform" element={<StudentForm classes={classes}/>} />
        <Route path="/coachform" element={<CoachFrom classes={classes}/>} />

        <Route path="/revenue" element={<Revenue classes={classes}/>} />

      </Routes>
    </BrowserRouter> 
    
  )
}

export default App
