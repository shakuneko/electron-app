

// import 'bootstrap/dist/js/bootstrap';
import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        
      </Routes>
    </HashRouter> 
    // <Form/>
  )
}

export default App
