import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StudentDetail from '../components/StudentDetail'
function StudentDetailPage({classes}) {
  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10">
          <StudentDetail classes={classes} />
        </div>
      </div>
    </div>
  )
}

export default StudentDetailPage
