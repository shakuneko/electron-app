import Navbar from '../components/Navbar'
import StudentTableDetail from '../components/StudentTableDetail';
import testClasses from '../json/test_class.json'

function StudentTable() {

    const stuData = [];

    testClasses.forEach((item) => {
        if (!stuData.includes(item.student.stuID)) {
            // 如果資料不重複，則將其添加到列表中
            stuData.push(item);
          }
    });
    
    return (
        <div className="container-fluid">
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>學員管理</h1>
                    <StudentTableDetail classes={stuData}/>
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default StudentTable