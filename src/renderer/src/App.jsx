
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Table from "./page/Table"
import classes from "./json/class.json"

import ClassDetail from "./page/ClassDetail";
import CoachDetail from './page/CoachDetail';
import StudentDetailPage from './page/StudentDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Table classes={classes}/>} />
        <Route path="/classdetail" element={<ClassDetail classes={classes}/>} />
        <Route path="/coachdetail" element={<CoachDetail classes={classes}/>} />
        <Route path="/studentdetail" element={<StudentDetailPage classes={classes}/>} />
      </Routes>
    </BrowserRouter> 
    
  )
}

export default App
