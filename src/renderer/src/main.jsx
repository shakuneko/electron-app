import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import './assets/Form.css'
import './assets/Nav.css'
import './assets/Table.css'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './stylesheets/all.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
