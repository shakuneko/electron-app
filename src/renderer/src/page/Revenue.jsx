import Navbar from '../components/Navbar'
import RevenueSetTable from '../components/RevenueSetTable'
import { columnsRevenue, columnsMoney } from '../components/TableSelectOptions'
import newJson from '../json/new_class.json'
import { DateTime } from 'luxon'
import emptyJson from '../json/emptyJson.json'
import { useSelector, useDispatch } from 'react-redux'
import { updateLastMonthRevenue } from '../redux/reducers/saveSlice'
import { useEffect } from 'react'

function Revenue({ classes }) {
  const dispatch = useDispatch()
  //new json new_class
  let nJson = classes

  //time date使用及判斷
  // 获取当前日期和时间
  const currentDateTime = DateTime.now()
  const formattedCurrentDateTime = currentDateTime.toFormat('yyyy/MM')
  // 减一個月
  const previousMonthDateTime = currentDateTime.minus({ months: 1 })
  // 格式化日期为 "yyyy/MM"
  const formattedDate = previousMonthDateTime.toFormat('yyyy/MM')
  let lastMonth = '沒有資料'
  let lastMonthCourse = '沒有資料'
  let lastMonthRevenue = '沒有資料'
  let lastMonthRevenueTable = [
    {
      "totalLeftSalary": 0,
      "classLeft": 0,
      "classType": "皮拉提斯"
    },
    {
      "totalLeftSalary": 0,
      "classLeft": 0,
      "classType": "PT"
    },
    {
      "totalLeftSalary": 0,
      "classLeft": 0,
      "classType": "場地租借"
    },
    {
      "totalLeftSalary": 0,
      "classLeft": 0,
      "classType": "運動按摩"
    }
  ]
  nJson.forEach((category) => {
    if (category.category === 'revenue') {
      category.revenueDetail.forEach((revenueData) => {
        if (revenueData.revenueDateMonth === formattedDate) {
          lastMonth = revenueData.revenueDateMonth
          lastMonthRevenueTable = revenueData.revenueList
        }
      })
    }
  })
  //console.log('lastMonth', lastMonth)
  console.log('BBB獲取資料中上個月的table值lastMonthRevenueTable', lastMonthRevenueTable)

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

  const coachSalaryMap = new Map()
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
            groupSalary: courseType === '場地租借' ? groupSalary * coursesAll : 0,
            massageSalary: courseType === '運動按摩' ? massageSalary * coursesAll : 0,
            pilatesSalary: courseType === '皮拉提斯' ? pilatesSalary * coursesAll : 0
          })
        }
      })
    }
  })
  // 将 Map 转换为数组
  const coachSalaryArray = [...coachSalaryMap]

  // coachSalaryArray 包含每位教练的薪资信息
  coachSalaryMap.forEach((salaries, coachID) => {
    console.log(`Coach ID: ${coachID}`)
    console.log(`PT Salary: ${salaries.ptSalary}`)
    console.log(`Group Salary: ${salaries.groupSalary}`)
    console.log(`Massage Salary: ${salaries.massageSalary}`)
    console.log(`Pilates Salary: ${salaries.pilatesSalary}`)
    console.log('-----------------------------')
  })

  //total salary個別教練 總薪水
  coachSalaryMap.forEach((salaries, coachID) => {
    const totalSalary =
      salaries.ptSalary + salaries.groupSalary + salaries.massageSalary + salaries.pilatesSalary
    console.log(`Coach ID: ${coachID}, Total Salary: ${totalSalary}`)
  })

  //total salary所有教練加總 總薪水 總月收入---------------------------------------------------
  //note: 本月學生的錢加總（buydate區分月份）學生下面的buydetail、coursePrice去乘
  let totalSalarySum = 0
  // 创建一个对象用于按月份存储课程价格
  const coursePriceByMonth = {};

// 遍历 "class" 类别中的数据
nJson.forEach(item => {
  if (item.category === "student" && item.stuDetail) {
    item.stuDetail.forEach(studentItem => {
      studentItem?.buyDetail.forEach(buyItem => {
      const buyDate = buyItem.buyDate;
      const courseType = buyItem.courseType||"未知";
      const coursePrice = parseInt(buyItem.coursePrice) || 0; // 解析课程价格字段

      // 添加错误检查：如果没有 buyDate 字段或其值为空，则跳过此项
      if (!buyDate) {
        return;
      }

      // 解析日期為月份 "yyyy/MM"
      const dateParts = buyDate.split("/");
      if (dateParts.length !== 3) {
        // 如果日期格式不正确，则跳过此项
        return;
      }
      const month = dateParts.slice(0, 2).join("/");

      // 如果月份不存在，创建一个月份的记录
      if (!coursePriceByMonth[month]) {
        coursePriceByMonth[month] = {};
      }

      // 如果课程类型不存在，创建一个课程类型的记录
      if (!coursePriceByMonth[month][courseType]) {
        coursePriceByMonth[month][courseType] = 0;
      }

      // 累加课程价格
      coursePriceByMonth[month][courseType] += coursePrice;

    });
    });
  }
});
//console.log("coursepriccc",coursePriceByMonth["2023/09"])
// 打印每月的课程价格
for (const month in coursePriceByMonth) {
  // 获取该月份的课程价格对象
  const monthData = coursePriceByMonth[month];
  // 创建一个 DateTime 对象以便与当前日期比较
  const itemDate = DateTime.fromFormat(month, "yyyy/MM");
 console.log("itemDate",monthData)
// console.log("itemDate2",formattedCurrentDateTime)
  // 在这里，你可以进行与当前日期的比较以及累加 totalSalarySum 的逻辑
  if(month === formattedCurrentDateTime){
    for (const courseType in monthData) {
      totalSalarySum += monthData[courseType];
    }

  }
}
  //console.log(`所有薪水总和: ${totalSalarySum}`)

//----------------------計算本月上課堂數並以課程分類、以attandece為是----
// 创建一个对象，用于按月份存储上课次数
const classCountByMonth = {};
// 遍历 "category=class" 下的数据
nJson.forEach(item => {
  if (item.category === "class" && item.classDetail) {
    item.classDetail.forEach(classItem => {
      if (classItem.reserveDetail) {
        classItem.reserveDetail.forEach(reserveItem => {
          // 解析日期为月份 "yyyy/MM"
          const dateParts = reserveItem.reserveDate.split("/");
          if (dateParts.length === 3) {
            const month = dateParts.slice(0, 2).join("/");           
            // 如果月份不存在，创建一个月份的记录并初始化计数为0
            if (!classCountByMonth[month]) {
              classCountByMonth[month] = 0;
            }
            
            // 如果 "attendance" 是 "是"，增加计数
            if (reserveItem.attandence === "是") {
              //console.log("classBBBC",classCountByMonth[month])
              classCountByMonth[month]++;
            }
          }
        });
      }
    });
  }
});

// 打印每个月份的上课次数
//可以用於每月「已」上課次數（核銷未核銷堂數）
console.log("AAAC上课次数按月份统计：", classCountByMonth[formattedCurrentDateTime]);

//----------------------計算所有的課程總堂數courseAll---------------------
const courseAllByMonth = {}
nJson.forEach(item => {
  if (item.category === "class" && item.classDetail) {
    item.classDetail.forEach(classItem => {
      const buyDate = classItem.buyDate.split("-");
      if (buyDate.length === 3) {
        const month = buyDate.slice(0, 2).join("/");
        // 如果月份不存在，创建一个月份的记录并初始化计数为0
        if (!courseAllByMonth[month]) {
          courseAllByMonth[month] = 0;
        }
        courseAllByMonth[month] += parseInt(classItem.coursesAll) || 0;
      }
    });
  }
});
console.log("BBBC課程總堂數courseAll按月份统计：", courseAllByMonth[formattedCurrentDateTime]);
//標題呈現本月課程堂數
//-------------未上課次數（未核銷堂數）-> 全部課程減去已上課 ---------------------
let courseLeftByMonth = 0

courseLeftByMonth = parseInt(courseAllByMonth[formattedCurrentDateTime]??"0") - parseInt(classCountByMonth[formattedCurrentDateTime]??"0")

console.log("BBBC課程未上課次數（未核銷堂數）：", courseLeftByMonth);

  //-------------------------------------------------------------------
  // 按 courseType 分类的数据 計算為未核銷金額
  const courseTypeLeftData = {}
  let totalLeftCourseCount = 0

  let totalLeftPtClass = 0
  let totalLeftGroupClass = 0
  let totalLeftMassageClass = 0
  let totalLeftPilatesClass = 0

  // 遍历 JSON 数据并整理
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const courseType = classItem.courseType
        const courseLeft = parseInt(classItem.courseLeft) || 0
        let totalLeftSalary = 0

        //console.log('課程對應未核銷堂數', courseType, courseLeft)

        // 查找该班级的 coach 数据
        if (classItem.coach && classItem.coach.length > 0) {
          const coachID = classItem.coach[0].coachID
          //console.log("課程對應教練ID",coachID);
          // 查找对应的 coach 数据
          const coachData = nJson.find(
            (item) =>
              item.category === 'coach' &&
              item.coachDetail.find((coach) => coach.coachID === coachID)
          )

          if (coachData) {
            let coachSalary = 0
            switch (courseType) {
              case 'PT':
                coachSalary = coachData.coachDetail[0].PtSalary || 0
                break
              case '場地租借':
                coachSalary = coachData.coachDetail[0].GroupSalary || 0
                break
              case '運動按摩':
                coachSalary = coachData.coachDetail[0].MassageSalary || 0
                break
              case '皮拉提斯':
                coachSalary = coachData.coachDetail[0].PilatesSalary || 0
                break
              default:
                break
            }

            if (classItem.courseType === 'PT') {
              totalLeftPtClass += courseLeft
            } else if (classItem.courseType === '場地租借') {
              totalLeftGroupClass += courseLeft
            } else if (classItem.courseType === '運動按摩') {
              totalLeftMassageClass += courseLeft
            } else if (classItem.courseType === '皮拉提斯') {
              totalLeftPilatesClass += courseLeft
            }

            // 计算 totalLeftSalary
            totalLeftSalary = courseLeft * coachSalary
            //count totalLeftCourseCount
            totalLeftCourseCount += courseLeft
          }
        }

        if (!courseTypeLeftData[courseType]) {
          courseTypeLeftData[courseType] = {
            totalLeftSalary: 0
          }
        }

        courseTypeLeftData[courseType].totalLeftSalary += totalLeftSalary
      })
    }
  })

  const totalSumLeft = Object.values(courseTypeLeftData).reduce(
    (sum, typeData) => sum + typeData.totalLeftSalary,
    0
  )
  //for title's count
  console.log('AAAtotalSumLeft', totalSumLeft)
  console.log('AAAtotalLeftCourseCount', totalLeftCourseCount)
  // 输出整理后的数据
  //console.log("BBBleftcourseTotal",courseTypeLeftData);

  //-------------------------------------------------------------------計算未核銷堂數並以課程分類
  const classLeftData = {
    PT: totalLeftPtClass,
    場地租借: totalLeftGroupClass,
    運動按摩: totalLeftMassageClass,
    皮拉提斯: totalLeftPilatesClass
  }
  Object.keys(classLeftData).forEach((courseType) => {
    if (courseTypeLeftData[courseType]) {
      courseTypeLeftData[courseType].classLeft = classLeftData[courseType]
    }
  })

  //***************  use for up table  *********************
  //console.log("BBBcourseTypeLeftData", courseTypeLeftData);

  // 新的陣列----用於顯示本月為核銷金額之table
  const newThisMonthNotCountArray = []
  // 遍歷原始物件並轉換成新的陣列
  for (const classType in courseTypeLeftData) {
    if (courseTypeLeftData.hasOwnProperty(classType)) {
      const classData = courseTypeLeftData[classType]
      newThisMonthNotCountArray.push({
        totalLeftSalary: classData.totalLeftSalary,
        classLeft: classData.classLeft,
        classType: classType
      })
    }
  }
  console.log('BBBcourseTypeLeftData', newThisMonthNotCountArray)

  //計算為已核銷金額---------------------------------------------------
  // 创建一个对象来存储按 courseType 分类的数据 計算為未核銷金額
  const courseTypeFINData = {}
  let totalFINCourseCount = 0
  // 遍历 JSON 数据并整理
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const courseType = classItem.courseType
        const coursesFIN = parseInt(classItem.coursesFIN) || 0
        let totalFINSalary = 0
        //console.log("課程對應核銷堂數",courseType,coursesFIN);

        // 查找该班级的 coach 数据
        if (classItem.coach && classItem.coach.length > 0) {
          const coachID = classItem.coach[0].coachID
          //console.log("課程對應教練ID",coachID);
          // 查找对应的 coach 数据
          const coachData = nJson.find(
            (item) =>
              item.category === 'coach' &&
              item.coachDetail.find((coach) => coach.coachID === coachID)
          )

          if (coachData) {
            let coachSalary = 0
            switch (courseType) {
              case 'PT':
                coachSalary = coachData.coachDetail[0].PtSalary || 0
                break
              case '場地租借':
                coachSalary = coachData.coachDetail[0].GroupSalary || 0
                break
              case '運動按摩':
                coachSalary = coachData.coachDetail[0].MassageSalary || 0
                break
              case '皮拉提斯':
                coachSalary = coachData.coachDetail[0].PilatesSalary || 0
                break
              default:
                break
            }

            // 计算 totalSalary
            totalFINSalary = coursesFIN * coachSalary
            totalFINCourseCount += coursesFIN
          }
        }

        if (!courseTypeFINData[courseType]) {
          courseTypeFINData[courseType] = {
            totalFINSalary: 0
          }
        }

        courseTypeFINData[courseType].totalFINSalary += totalFINSalary
      })
    }
  })
  const totalSumFIN = Object.values(courseTypeFINData).reduce(
    (sum, typeData) => sum + typeData.totalFINSalary,
    0
  )
  //console.log('AAAtotalSumFIN', totalSumFIN)
  //console.log('AAAtotalFINCourseCount', totalFINCourseCount)
  // 输出整理后的数据
  //console.log('AAAfincoursetotal', courseTypeFINData)

  //下方表格使用---------------------------------------------------
  //計算coachFin,coachLeft以教練分類---------------------------------------------------
  const courseInfo = []
  // 遍历 JSON 数据并整理课程信息
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const courseLeft = parseInt(classItem.courseLeft) || 0
        const coursesFIN = parseInt(classItem.coursesFIN) || 0

        courseInfo.push({
          classID: classItem.classID,
          courseLeft,
          coursesFIN
        })
      })
    }
  })

  const coachInfo2 = {}

  // 遍历 JSON 数据并根据 coach 对教练进行分类
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const coach = classItem.coach[0] // 假设每个班级只有一个教练
        const coachID = coach.coachID
        const coachName = coach.coachName

        if (!coachInfo2[coachID]) {
          coachInfo2[coachID] = {
            coachName,
            courseLeftTotal: 0,
            coursesFINTotal: 0
          }
        }

        const courseLeft = parseInt(classItem.courseLeft) || 0
        const coursesFIN = parseInt(classItem.coursesFIN) || 0

        coachInfo2[coachID].courseLeftTotal += courseLeft
        coachInfo2[coachID].coursesFINTotal += coursesFIN
      })
    }
  })

  // 打印课程信息
  //console.log('课程信息', courseInfo)

  // 打印教练信息
  //console.log('教练信息', coachInfo2)

  // 根据 coachName 分类合并信息with major---------------------------------------------------
  const coachInfo = []

  // 遍历包含 coach 信息的数组
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'coach' && categoryItem.coachDetail) {
      categoryItem.coachDetail.forEach((coachItem) => {
        const coachData = {
          coachID: coachItem.coachID,
          coachName: coachItem.coachName,
          major: coachItem.major,
          teachClass: []
        }

        // 遍历 teachClass 数组并提取 classID
        if (coachItem.teachClass) {
          coachItem.teachClass.forEach((teachClassItem) => {
            coachData.teachClass.push(teachClassItem.classID)
          })
        }

        // 将提取的教练信息添加到结果数组中
        coachInfo.push(coachData)
      })
    }
  })
  // 输出结果
  //console.log('AAAcoachInfo', coachInfo)

  //課程核銷相關
  const classInfo = []
  // 遍历包含 class 信息的数组
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const classData = {
          classID: classItem.classID,
          coursesAll: classItem.coursesAll,
          coursesFIN: classItem.coursesFIN,
          courseLeft: classItem.courseLeft
        }

        // 将提取的班级信息添加到结果数组中
        classInfo.push(classData)
      })
    }
  })
  // 输出结果
  console.log('AAAclassInfo', classInfo)

  // const mergeInfo = coachInfo.reduce((result,itemB) => {
  //     itemB.teachClass.forEach((classIDs) => {
  //         const matchingClass = classIDs.map((classID) =>
  //         classInfo.find((itemC) => itemC.classID === classID)
  //         );
  //         result.push({ ...itemB, ...matchingClass });
  //     });
  //     return result;
  // }, []);
  // console.log("AAAmergeInfo",mergeInfo);
  const mergeInfo = coachInfo.reduce((result, itemB) => {
    itemB.teachClass.forEach((classIDs) => {
      const matchingClassID = classIDs[0] // 假设每个班级只有一项

      // 查找匹配的班级信息
      const matchingClass = classInfo.find((itemC) => itemC.classID === matchingClassID)

      if (matchingClass) {
        result.push({ ...itemB, ...matchingClass })
      }
    })
    return result
  }, [])
  //console.log('AAAmergeInfo', mergeInfo)

  //計算體驗課堂數exCourse---------------------------------------------------
  const coachExCourseCounts = {}

  // 遍历 JSON 数据
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        const coachName = classItem.coach[0].coachName
        const exCourse = classItem.exCourse

        if (!coachExCourseCounts[coachName]) {
          coachExCourseCounts[coachName] = 0
        }

        if (exCourse === '是') {
          coachExCourseCounts[coachName]++
        }
      })
    }
  })

  // 输出每个教练的 exCourse 总数
  //console.log('coachExCourseCount', coachExCourseCounts)

  // 根据 coachName 分类合并信息
  const mergeInfoLast = mergeInfo.map((coach) => {
    const coachName = coach.coachName
    const exCourseCount = coachExCourseCounts[coachName] || 0

    return {
      ...coach,
      exCourseCount
    }
  })

  console.log('完全合并的(table below)', mergeInfoLast)

  //下方表格使用---------------------------------------------------END

  //old---------------------------------------------------
  //計算營業額
  //   let sum = 0
  //   let finCourse = 0
  //   let finMoney = 0
  //   let leftCourse = 0
  //   let leftMoney = 0

  //   for (let i = 0; i < classes.length; i++) {
  //     if (i == 0) {
  //       sum = classes[i].salary * classes[i].coursesAll
  //       finCourse = classes[i].coursesFIN * 1
  //       finMoney = classes[i].salary * classes[i].coursesFIN

  //       leftCourse = classes[i].courseLeft * 1
  //       leftMoney = classes[i].courseLeft * classes[i].salary
  //     } else {
  //       sum += classes[i].salary * classes[i].coursesAll
  //       finCourse += classes[i].coursesFIN * 1
  //       finMoney += classes[i].salary * classes[i].coursesFIN

  //       leftCourse += classes[i].courseLeft * 1
  //       leftMoney += classes[i].courseLeft * classes[i].salary
  //       // sum +=  each
  //       // finCoures += course
  //     }
  //   }
  // const products = [
  //   {
  //     id: '0',
  //     courseType: 'PT',
  //     courseLeft: '3',
  //     preCourseLeft: '16',
  //     salary: '650'
  //   },
  //   {
  //     id: '1',
  //     courseType: '皮拉提斯',
  //     courseLeft: '6',
  //     preCourseLeft: '6',
  //     salary: '650'
  //   },
  //   {
  //     id: '2',
  //     courseType: '團課',
  //     courseLeft: '7',
  //     preCourseLeft: '7',
  //     salary: '650'
  //   },
  //   {
  //     id: '3',
  //     courseType: '場地租借',
  //     courseLeft: '3',
  //     preCourseLeft: '6',
  //     salary: '650'
  //   },
  //   {
  //     id: '4',
  //     courseType: '運動舒緩',
  //     courseLeft: '0',
  //     preCourseLeft: '0',
  //     salary: '650'
  //   }
  // ]
  //---------------------------------------------------old above

  //將上月資料推入table array
  const renameTheLastMonth = lastMonthRevenueTable.map((item) => {
    return {
      totalLeftSalaryLast: item.totalLeftSalary,
      classLeftLast: item.classLeft,
      classTypeLast: item.classType
    }
  })
  //const mergeOldAndNew = [...renameTheLastMonth, ...newThisMonthNotCountArray]
  const mergeOldAndNew = newThisMonthNotCountArray.map((item, index) => ({
    ...item,
    ...renameTheLastMonth[index]
  }))
  //最後的資料輸出到table
  console.log('BBB總呈現TotalmergeOldAndNew', mergeOldAndNew)

  //將上月資料推入array、透過時間判斷---------------------------------------------------
  //save this month data here
  const currentMonthData = {
    revenueDateMonth: currentDateTime.toFormat('yyyy/MM'), // 自动生成当前年份和月份
    revenueList: newThisMonthNotCountArray
    // [
    //   {
    //     totalLeftSalary: 25500,
    //     classLeft: 7,
    //     classType: '皮拉提斯'
    //   },
    //   {
    //     totalLeftSalary: 13500,
    //     classLeft: 1,
    //     classType: 'PT'
    //   },
    //   {
    //     totalLeftSalary: 11500,
    //     classLeft: 2,
    //     classType: '團課'
    //   },
    //   {
    //     totalLeftSalary: 15000,
    //     classLeft: 0,
    //     classType: '運動按摩'
    //   }
    // ]
  }

  //------------辨識月份並將資料推入nJson、判斷是否有該月份資料、有則更新、無則新增
  let revenueCategoryIndex = nJson.findIndex((item) => item.category === 'revenue')

  if (revenueCategoryIndex !== -1) {
    // 更新 revenueCategory 对象的 revenueDetail 属性
    const updatedRevenueDetail = [
      ...(nJson[revenueCategoryIndex]?.revenueDetail || []),
      currentMonthData
    ]

    // 创建一个新的 nJson 数组
    const updatedNJson = nJson.map((item, index) => {
      if (index === revenueCategoryIndex) {
        // 更新 category: revenue 对象
        return {
          ...item,
          revenueDetail: updatedRevenueDetail
        }
      } else {
        return item
      }
    })
    nJson = updatedNJson // 更新 nJson 数组
    console.log('updatedRevenueDetail', nJson[revenueCategoryIndex])
  } else {
    const newRevenueCategory = {
      category: 'revenue',
      revenueDetail: [currentMonthData]
    }

    // 将新的 "revenue" 类别对象添加到 nJson 数组中
    nJson.push(newRevenueCategory)
    console.log('newRevenueCategory', nJson)
  }

  //check time and save to revenue
  const fileContent = useSelector((state) => state.root.save.fileName)

  const data = fileContent?.newJsonData
  // 检查数据是否存在
  if (data && Array.isArray(data)) {
    // 提取所有的 revenueDateMonth，并将它们转换为 DateTime 对象，仅考虑年份和月份
    const revenueMonths = data
      .flatMap((item) => item.revenueDetail || []) // 使用空数组作为默认值，以避免未定义的属性
      .map((revenue) => {
        const parts = revenue.revenueDateMonth.split('/')
        return DateTime.fromObject({ year: parseInt(parts[0]), month: parseInt(parts[1]) })
      })

    // 检查是否有有效的 revenueMonths 数组
    if (revenueMonths.length > 0) {
      // 找到最大的 revenueDateMonth
      const maxRevenueMonth = revenueMonths.reduce((maxMonth, currentMonth) => {
        return currentMonth > maxMonth ? currentMonth : maxMonth
      }, revenueMonths[0])

      // 获取当前日期和时间
      const currentMonth = DateTime.now().startOf('month')

      // 比较最大月份和当前月份
      console.log('maxRevenueMonth', maxRevenueMonth)
      console.log('currentMonth', currentMonth)
      useEffect(() => {
        if (maxRevenueMonth < currentMonth) {
          console.log('最大的 revenueDateMonth 小于当前月份。')
          //將紀錄再 nJson 的redux的值修改

          if (nJson.length !== 0) {
            dispatch(updateLastMonthRevenue(nJson))
          }
        } else {
          console.log('最大的 revenueDateMonth 大于或等于当前月份。')
        }
      }, [])
    } else {
      console.log('没有有效的 revenueMonths 数组。')
    }
  } else {
    console.log('数据变量未定义或不是数组。')
  }

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
              <h1 className="money-title mt-2 title">$ {totalSalarySum}</h1>
            </div>
            {/* <RevenueSetTable classes={classes} columns={columnsRevenue}/> */}
            <RevenueSetTable classes={mergeOldAndNew} columns={columnsRevenue} />
            <h1 className="title  mt-4">核銷</h1>
            <div className="row">
              <div className="col-6">
                <div>已核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {totalSumFIN} / {classCountByMonth[formattedCurrentDateTime]??"0"}堂
                  {/* $ {totalSumFIN} / {totalFINCourseCount}堂 */}
                </h1>
              </div>
              <div className="col-6">
                <div>未核銷</div>
                <h1 className="money-title mt-2 title">
                  {/*new*/}
                  {/* $ {totalSumLeft} / {courseLeftByMonth}堂 */}
                  {/*old*/}
                  $ {totalSumLeft} / {totalLeftCourseCount}堂
                </h1>
              </div>
            </div>
            <RevenueSetTable classes={mergeInfoLast} columns={columnsMoney} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
