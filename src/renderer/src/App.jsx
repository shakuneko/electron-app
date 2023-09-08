// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Table from './page/Table'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
        
      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
