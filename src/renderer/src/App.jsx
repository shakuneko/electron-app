
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Table from "./page/Table"
import classes from "./json/class.json"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Table classes={classes}/>} />
      </Routes>
    </BrowserRouter> 
    
  )
}

export default App
