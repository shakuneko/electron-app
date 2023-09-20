import Navbar from '../components/Navbar'
import RevenueSetTable from '../components/RevenueSetTable'
import { columnsRevenue, columnsMoney } from '../components/TableSelectOptions'
import newJson from '../json/new_class.json'
function Revenue({ classes }) {
  //new json new_class
  const nJson = newJson
  // 创建一个新的 Map 对象，用于存储教练与其课程类型的关系
  const coachCoursesMap = new Map()

  // 遍历 JSON 数据，将每个教练与其课程类型关联起来
  nJson.forEach((category) => {
    if (category.category === 'class') {
      category.classDetail.forEach((classData) => {
        const coachID = classData.coach[0].coachID
        const courseType = classData.courseType

        // 检查 Map 中是否已有该教练的记录
        if (coachCoursesMap.has(coachID)) {
          // 如果已有记录，将课程类型添加到数组中
          const currentCourses = coachCoursesMap.get(coachID)
          currentCourses.push(courseType)
          coachCoursesMap.set(coachID, currentCourses)
        } else {
          // 如果没有记录，创建新的记录并初始化课程类型数组
          coachCoursesMap.set(coachID, [courseType])
        }
      })
    }
  })
  // 将 Map 转换为数组
  const coachCoursesArray = [...coachCoursesMap]
  // coachCoursesArray 包含每位教练id对应的课程类型数组
  console.log(coachCoursesArray)


  const coachSalaryMap = new Map();
  // 遍历 JSON 数据，打印每个教练的 ID、课程类型和 coursesAll
  nJson.forEach((category) => {
    if (category.category === 'class') {
      category.classDetail.forEach((classData) => {
        const coachID = classData.coach[0].coachID
        const courseType = classData.courseType
        const coursesAll = classData.coursesAll

        // 打印教练 ID、课程类型和 coursesAll
        console.log(`教练 ID: ${coachID}, 课程类型: ${courseType}, coursesAll: ${coursesAll}`)

        // 查找对应教练的薪资信息
        const coachInfo = nJson.find(
          (item) =>
            item.category === 'coach' && item.coachDetail.some((coach) => coach.coachID === coachID)
        )

        if (coachInfo) {
          const ptSalary = coachInfo.coachDetail.find((coach) => coach.coachID === coachID).PtSalary
          const groupSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).GroupSalary
          const massageSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).MassageSalary
          const pilatesSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).PilatesSalary

          // 计算薪资乘以 coursesAll，并存储到 Map 中
          coachSalaryMap.set(coachID, {
            ptSalary: courseType === 'PT' ? ptSalary * coursesAll : 0,
  groupSalary: courseType === '團課' ? groupSalary * coursesAll : 0,
  massageSalary: courseType === '運動舒緩' ? massageSalary * coursesAll : 0,
  pilatesSalary: courseType === '皮拉提斯' ? pilatesSalary * coursesAll : 0,
          })
        }
      })
    }
  })
  // 将 Map 转换为数组
const coachSalaryArray = [...coachSalaryMap];

// coachSalaryArray 包含每位教练的薪资信息
//console.log(coachSalaryArray);
// 遍历教练薪资 Map
coachSalaryMap.forEach((salaries, coachID) => {
    console.log(`Coach ID: ${coachID}`);
    console.log(`PT Salary: ${salaries.ptSalary}`);
    console.log(`Group Salary: ${salaries.groupSalary}`);
    console.log(`Massage Salary: ${salaries.massageSalary}`);
    console.log(`Pilates Salary: ${salaries.pilatesSalary}`);
    console.log('-----------------------------');
  });

  //total salary個別教練總薪水
  coachSalaryMap.forEach((salaries, coachID) => {
    const totalSalary =
      salaries.ptSalary +
      salaries.groupSalary +
      salaries.massageSalary +
      salaries.pilatesSalary;
    console.log(`Coach ID: ${coachID}, Total Salary: ${totalSalary}`);
  });

    //total salary所有教練加總 總薪水
    let totalSalarySum = 0;

    coachSalaryMap.forEach((salaries) => {
      const { ptSalary, groupSalary, massageSalary, pilatesSalary } = salaries;
      totalSalarySum +=
        ptSalary +
        groupSalary +
        massageSalary +
        pilatesSalary;
    });
    console.log(`所有教练的薪水总和: ${totalSalarySum}`);

  //計算營業額
  let sum = 0
  let finCourse = 0
  let finMoney = 0
  let leftCourse = 0
  let leftMoney = 0

  for (let i = 0; i < classes.length; i++) {
    if (i == 0) {
      sum = classes[i].salary * classes[i].coursesAll
      finCourse = classes[i].coursesFIN * 1
      finMoney = classes[i].salary * classes[i].coursesFIN

      leftCourse = classes[i].courseLeft * 1
      leftMoney = classes[i].courseLeft * classes[i].salary
    } else {
      sum += classes[i].salary * classes[i].coursesAll
      finCourse += classes[i].coursesFIN * 1
      finMoney += classes[i].salary * classes[i].coursesFIN

      leftCourse += classes[i].courseLeft * 1
      leftMoney += classes[i].courseLeft * classes[i].salary
      // sum +=  each
      // finCoures += course
    }
  }
  const products = [
    {
      id: '0',
      courseType: 'PT',
      courseLeft: '15',
      preCourseLeft: '16',
      salary: '650'
    },
    {
      id: '1',
      courseType: '皮拉提斯',
      courseLeft: '6',
      preCourseLeft: '6',
      salary: '650'
    },
    {
      id: '2',
      courseType: '團課',
      courseLeft: '7',
      preCourseLeft: '7',
      salary: '650'
    },
    {
      id: '3',
      courseType: '場地租借',
      courseLeft: '3',
      preCourseLeft: '6',
      salary: '650'
    },
    {
      id: '4',
      courseType: '運動舒緩',
      courseLeft: '0',
      preCourseLeft: '0',
      salary: '650'
    }
  ]
  return (
    <div className="container-fluid" style={{ backgroundColor: 'white' }}>
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10 container margin-left-right">
          <div className="table-container">
            <h1 className="title">營業額</h1>
            <div>
              <div>總收入/月</div>
              <h1 className="money-title mt-2 title">$ {sum}</h1>
            </div>
            {/* <RevenueSetTable classes={classes} columns={columnsRevenue}/> */}
            <RevenueSetTable classes={products} columns={columnsRevenue} />
            <h1 className="title  mt-4">核銷</h1>
            <div className="row">
              <div className="col-6">
                <div>已核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {finMoney} / {finCourse}堂
                </h1>
              </div>
              <div className="col-6">
                <div>未核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {leftMoney} / {leftCourse}堂
                </h1>
              </div>
            </div>
            <RevenueSetTable classes={classes} columns={columnsMoney} />
            <div>{coachCoursesArray}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
