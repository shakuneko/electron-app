// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Table from './page/Table'
import classes from './json/class.json'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table classes={classes} />} />
        
      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
