import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StudentDetailPage from '../components/StudentDetailPage'
import testClasses from '../json/test_class.json'

function StudentDetail() {
    const { stuName } = useParams();
    const testClass = testClasses.find(
        (x) => x.student.stuName === stuName
    );

    return (
        <div className="container-fluid" >
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        {testClass.student.stuName}
                        <StudentDetailPage classes={testClass} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default StudentDetail