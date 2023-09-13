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
import testClass from './json/test_class.json'

import SaveJsonPage from './page/SaveJsonPage';
//redux
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ClassTable/>} />
          <Route path="classes">
            <Route path="form" element={<ClassForm />} />
            <Route path="id/:id" element={<ClassDetail />} />
          </Route>
          <Route path="/student" element={<StudentTable classes={classes}/>} />
          <Route path="/coach" element={<CoachTable classes={classes}/>} />
          <Route path="/revenue" element={<Revenue classes={classes}/>} />

            {/* <Route path="/form" element={<Form />} /> */}
          <Route path="/form" element={<ClassForm />} />
          {/* <Route path="/jsonform" element={<JsonForm />} /> */}
          <Route path="/studentform" element={<StudentForm classes={classes}/>} />
          <Route path="/coachform" element={<CoachFrom classes={classes}/>} />

          {/* <Route path="/classdetail" element={<ClassDetail classes={classes}/>} /> */}
          <Route path="/coachdetail" element={<CoachDetail classes={classes}/>} />
          <Route path="/studentdetail" element={<StudentDetail classes={classes}/>} />

          <Route path="/savejson" element={<SaveJsonPage />} />
        </Routes>
      </HashRouter> 
    {/*  <Form/> */}
    </Provider>
  )
}

export default App
