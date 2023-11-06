import { useParams } from 'react-router-dom';
// import newJson from '../json/new_class.json'

function CoachTopBar({coachValue, classes, tableData}) {
    const { id } = useParams();
  //console.log('courseleft:', coachValue[id].student.courseLeft)

    // 獲取教練所教授的課程的 classID
    const courseLefts =[]
    const matchingStudentData = [];
    const teachClassIDs = coachValue.teachClass.map(students => students.classID);
    for (const student of classes.find(item => item.category === "student").stuDetail) {
      // 遍歷每位學生的 buyDetail
      for (const buyDetail of student.buyDetail) {
          // 比對 classID 是否在目標 classIDs 中
          if (teachClassIDs.includes(buyDetail.classID)) {
              matchingStudentData.push(student);
              break; // 如果找到符合條件的就跳出內層迴圈
          }
      }
    }

    console.log("count",matchingStudentData)
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth()
    console.log("currentDate",currentDate, currentYear, currentMonth, tableData, coachValue)

    let thisMonthTotalClass = 0
    let countedReserve = []
    if(tableData){
      tableData.forEach( item => {
        const reserveTime = new Date(item.reserveDate);
        if (reserveTime.getFullYear() == currentYear && reserveTime.getMonth() == currentMonth) {
          if (!countedReserve.includes(item.reserveID)){
            if ( (item.attandence =='是' && item.cancel =='否') || (item.attandence =='否' && item.cancel =='否') ) {
              thisMonthTotalClass ++
              countedReserve.push(item.reserveID)
            }
          }
          else {
            if ( item.attandence =='否' && item.cancel =='是' ) {
              thisMonthTotalClass --
              countedReserve = countedReserve.filter((index) => index !== item.reserveID);
            }
          }
        }

        }
      )}
    
    console.log("thisMonthTotalClass",thisMonthTotalClass)

    let totalSalary = 0
    let alreadyCount = []
    // 將學生剩餘堂數加到陣列
    matchingStudentData.forEach(item => {
      item.buyDetail.forEach(names => {
        if (teachClassIDs.includes(names.classID)) {
          if (! alreadyCount.includes(names.classID)){
            alreadyCount.push(names.classID)
            courseLefts.push(names.courseLeft)
            // console.log("alreadyCount",alreadyCount)
            if (names.courseType === "PT1v1" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.PtSalary
            }
            else if (names.courseType === "PT1v2" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.PtSalary1v2
            }
            if (names.courseType === "基皮" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.PilatesSalary1
            }
            else if (names.courseType === "高皮" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.PilatesSalary2
            }
            else if (names.courseType === "團課" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.GroupSalary
            }
            else if (names.courseType === "運動按摩" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.MassageSalary
            }
            else if (names.courseType === "場地租借" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.RentSalary
            }
            else if (names.courseType === "體驗基皮" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.exCoursePilatesSalary1
            }
            else if (names.courseType === "體驗高皮" ) {
              totalSalary +=  thisMonthTotalClass * coachValue.exCoursePilatesSalary2
            }
          }

        }

      })
    })
    // console.log("totalSalary",totalSalary)

    // 將學生剩餘堂數加總
    const totalStudentCourseLeft = courseLefts.reduce((accumulator, currentValue) => {
      // 使用 parseInt 函數將字串轉換為數字
      const currentNumber = parseInt(currentValue, 10);
      
      // 檢查轉換後的值是否為有效數字，然後再相加
      if (!isNaN(currentNumber)) {
        return accumulator + currentNumber;
      } else {
        return accumulator;
      }
    }, 0); // 初始值設為 0


    

    return (
      <div className="coach-top-bar">
        <p className="coach-top-bar-item"> 教練本月薪資：{totalSalary}</p>
        {/* 計算所有學員剩餘的堂數總和 */}
        <p className="coach-top-bar-item"> 學員剩餘總堂數：{totalStudentCourseLeft}</p>
    
      </div>
    );
  }
  
export default CoachTopBar;