import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StudentDetailPage from '../components/StudentDetailPage'
import testClasses from '../json/test_class.json'

function StudentDetail() {
    const { stuName, stuID } = useParams();
    const testClass = testClasses.find(
        (x) => x.student.stuID === stuID
    );

    const stuData = new Set();

    testClasses.forEach((item) => {
      if (item.student.stuID === stuID) {
        stuData.add(item);
      }
    });
  
    // 將 Set 轉換為陣列（如果需要）
    const stuArray = Array.from(stuData);
  

    return (
        <div className="container-fluid" >
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        {/* {testClasses["PT"].id} */}
                        {/* {stuArray[0].student.buyDetail.buyDate} */}
                        {/* <button onClick={()=> console.log(stuArray)}>pp</button> */}
                        <StudentDetailPage classes={stuArray} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default StudentDetail