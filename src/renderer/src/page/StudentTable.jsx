import Navbar from '../components/Navbar'
import StudentTableDetail from '../components/StudentTableDetail';
import testClasses from '../json/test_class.json'

function StudentTable() {

    const stuData = [];
    const uniqueStuIDs = new Set();

    testClasses.forEach((item) => {
        const stuID = item.student.stuID;
        if (!uniqueStuIDs.has(stuID)) {
            // 如果 stuID 還沒有被添加，則將該項目添加到 filteredData
            stuData.push(item);
            // 同時將 stuID 添加到 uniqueStuIDs Set 中，以記錄它已經被添加
            uniqueStuIDs.add(stuID);
        }else {   // 如果 stuID 已經存在，則找到現有 mergedData 中相同 stuID 的項目
        const existingItem = stuData.find((mergedItem) => mergedItem.student.stuID === stuID);
        
            // 然後將當前項目的 reserveDetail 資料 push 到現有項目的 reserveDetail 中
            existingItem.student.buyDetail.push(...item.student.buyDetail);
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
                     <button onClick={()=> console.log(stuData)}>pp</button>
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default StudentTable