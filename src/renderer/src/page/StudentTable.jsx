import Navbar from '../components/Navbar'
import StudentTableDetail from '../components/StudentTableDetail';
import testClasses from '../json/test_class.json'

function StudentTable() {

    // const stuBuyData = [];
    // const uniqueStuIDs = new Set();

    // testClasses.forEach((item) => {
    //     const stuID = item.student.stuID;
    //     if (!uniqueStuIDs.has(stuID)) {
    //         // 如果 stuID 還沒有被添加，則將該項目添加到 filteredData
    //         stuBuyData.push(item);
    //         // 同時將 stuID 添加到 uniqueStuIDs Set 中，以記錄它已經被添加
    //         uniqueStuIDs.add(stuID);
    //     }else {   // 如果 stuID 已經存在，則找到現有 mergedData 中相同 stuID 的項目
    //         const existingItem = stuBuyData.find((mergedItem) => mergedItem.student.stuID === stuID);
        
    //         // 然後將當前項目的 reserveDetail 資料 push 到現有項目的 reserveDetail 中
    //         // existingItem.student.buyDetailArray.push(...item.student.buyDetail);

    //         // 遍歷當前項目的 reserveDetail 資料
    //         item.student.buyDetailArray.forEach((buyDetailItem) => {
    //             // 檢查 reserveId 是否已經存在於現有項目的 reserveDetail 中
    //             const isReserveIdExists = existingItem.student.buyDetailArray.some(
    //             (existingReserve) => existingReserve.reserveId === buyDetailItem.reserveId
    //             );
                
    //             // 如果 reserveId 還沒有被添加，則將當前 reserve 資料 push 到現有項目的 reserveDetail 中
    //             if (!isReserveIdExists) {
    //             existingItem.student.buyDetailArray.push(buyDetailItem);
    //         }
    //         });
    //     }
    // });
    const mergedData = []; // 存儲合併後的資料

    testClasses.forEach((item) => {
        const stuID = item.student.stuID;
      
        // 檢查是否已存在具有相同 stuID 的項目
        const existingItemIndex = mergedData.findIndex((mergedItem) => mergedItem.student.stuID === stuID);
      
        if (existingItemIndex === -1) {
          // 如果不存在，創建新項目
          const newItem = { ...item };
          
          // 將 buyDetail 存入 buyDetailArray
          newItem.student.buyDetailArray = [newItem.student.buyDetail];
          
          // 刪除 buyDetail 屬性
        //   delete newItem.student.buyDetail;
          
          // 添加新項目到 mergedData
          mergedData.push(newItem);
        } else {
          // 如果已存在，將 buyDetail 資料 push 到相應的 buyDetailArray 中
          mergedData[existingItemIndex].student.buyDetailArray.push(item.student.buyDetail);
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
                    <StudentTableDetail classes={mergedData}/>
                     {/* <button onClick={()=> console.log(mergedData)}>pp</button> */}
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default StudentTable