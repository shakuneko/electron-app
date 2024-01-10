import Navbar from '../components/Navbar'
import RevenueSetTable from '../components/RevenueSetTable'
import { columnsRevenue, columnsMoney } from '../components/TableSelectOptions'
import newJson from '../json/new_class.json'
import { DateTime } from 'luxon'
import emptyJson from '../json/emptyJson.json'
import { useSelector, useDispatch } from 'react-redux'
import { updateLastMonthRevenue } from '../redux/reducers/saveSlice'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//計算：
//本月未核銷：上月未核銷 ＋ 本月購買 - 本月已核銷
//本月簽約：這個月學員有來買課的金額 不管有沒有核銷

//使用的第一個月的未核銷： 0 ＋ 本月購買（簽約） - 本月已核銷

// Json第五包初步設計－for新的金流表格
export let newData = [
  {
    courseType: 'PT 1v1',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '20',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: '何軒',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      },
      {
        coachName: 'A',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  },
  {
    courseType: 'PT 1v2',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '19',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: 'B',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '200',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '800',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  },
  {
    courseType: '基礎皮拉提斯',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '20',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: 'C',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  },
  {
    courseType: '高階皮拉提斯',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '20',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: 'D',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  },
  {
    courseType: '運動按摩',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '20',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: 'E',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  },
  {
    courseType: '場地租金',
    preLeftCourse: '10',
    preLeftMoney: '1000',
    totalCourse: '5000',
    totalMoney: '5000',
    finCourse: '20',
    finMoney: '1000',
    leftCourse: '10',
    leftMoney: '3000',
    coaches: [
      {
        coachName: 'F',
        preLeftCourse: '10',
        preLeftMoney: '1000',
        totalCourse: '5000',
        totalMoney: '5000',
        finCourse: '20',
        finMoney: '1000',
        leftCourse: '10',
        leftMoney: '3000',
        exCourseTotal: '3',
        total: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          },
          {
            buyDate: '2023-07-29',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            invoiceNum: 'XXXXX'
          }
        ],
        fin: [
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          },
          {
            courseDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            money: '2,000,000',
            courseSalary: '1000'
          }
        ],
        left: [
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          },
          {
            buyDate: '2023-07-30',
            stuName: 'Lulu',
            course: '80',
            finCourse: '10',
            leftCourse: '70'
          }
        ]
      }
    ]
  }
]

function Revenue({ classes }) {
  const dispatch = useDispatch()
  //new json new_class
  let nJson = classes

  //time date使用及判斷
  // 获取当前日期和时间
  const currentDateTime = DateTime.now()
  const formattedCurrentDateTime = currentDateTime.toFormat('yyyy-MM')
  console.log('獲取本月的月份formattedCurrentDateTime', formattedCurrentDateTime)
  // 减一個月
  const previousMonthDateTime = currentDateTime.minus({ months: 1 })
  // 格式化日期为 "yyyy/MM"
  const formattedDate = previousMonthDateTime.toFormat('yyyy-MM')
  let lastMonth = '沒有資料'
  let lastMonthCourse = '沒有資料'
  let lastMonthRevenue = '沒有資料'
  let lastMonthRevenueTable = [
    {
      totalLeftSalary: 0,
      classLeft: 0,
      classType: '皮拉提斯'
    },
    {
      totalLeftSalary: 0,
      classLeft: 0,
      classType: 'PT'
    },
    {
      totalLeftSalary: 0,
      classLeft: 0,
      classType: '場地租借'
    },
    {
      totalLeftSalary: 0,
      classLeft: 0,
      classType: '運動按摩'
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

  //----------------------計算本月上課堂數並以課程分類、以attandence為是----
  // 创建一个对象，用于按月份存储上课次数
  const classCountByMonth = {}
  // 遍历 "category=class" 下的数据
  nJson.forEach((item) => {
    if (item.category === 'class' && item.classDetail) {
      item.classDetail.forEach((classItem) => {
        if (classItem.reserveDetail) {
          classItem.reserveDetail.forEach((reserveItem) => {
            // 解析日期为月份 "yyyy/MM"
            const dateParts = reserveItem.reserveDate.split('-')
            if (dateParts.length === 3) {
              const month = dateParts.slice(0, 2).join('-')
              // 如果月份不存在，创建一个月份的记录并初始化计数为0
              if (!classCountByMonth[month]) {
                classCountByMonth[month] = 0
              }

              // 如果 "attandence" 是 "是"，增加计数
              if (reserveItem.attandence === '是') {
                //console.log("classBBBC",classCountByMonth[month])
                classCountByMonth[month]++
              }
            }
          })
        }
      })
    }
  })

  // 打印每个月份的上课次数
  //可以用於每月「已」上課次數（核銷未核銷堂數）
  console.log('AAAC上课次数按月份统计：', classCountByMonth[formattedCurrentDateTime] ?? '沒資料')

  //----------------------計算所有的課程總堂數courseAll---------------------
  const courseAllByMonth = {}
  nJson.forEach((item) => {
    if (item.category === 'class' && item.classDetail) {
      item.classDetail.forEach((classItem) => {
        const buyDate = classItem.buyDate?.split('-')
        if (buyDate) {
          if (buyDate.length === 3) {
            const month = buyDate.slice(0, 2).join('-')
            // 如果月份不存在，创建一个月份的记录并初始化计数为0
            if (!courseAllByMonth[month]) {
              courseAllByMonth[month] = 0
            }
            courseAllByMonth[month] += parseInt(classItem.coursesAll) || 0
          }
        }
      })
    }
  })
  console.log(
    'BBBC課程總堂數courseAll按月份统计：',
    courseAllByMonth[formattedCurrentDateTime] ?? '沒資料'
  )
  //標題呈現本月課程堂數
  //-------------未上課次數（未核銷堂數）-> 全部課程減去已上課 ---------------------
  let courseLeftByMonth = 0

  courseLeftByMonth =
    parseInt(courseAllByMonth[formattedCurrentDateTime] ?? '0') -
    parseInt(classCountByMonth[formattedCurrentDateTime] ?? '0')

  console.log('BBBC課程未上課次數（未核銷堂數）：', courseLeftByMonth)

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
        // 初始化变量来计算本月的 attandence 次数--------計算attendance來計算已核銷堂數
        let attandenceCount = 0
        // 遍历课程的 reserveDetail 数组
        classItem.reserveDetail.forEach((reserve) => {
          // 获取 reserveDate 的月份部分
          const reserveMonth =
            reserve.reserveDate.split('-')[0] + '-' + reserve.reserveDate.split('-')[1]
          // 检查月份是否与当前月份匹配，并且 attandence 是否为 "是"
          if (reserveMonth === formattedCurrentDateTime && reserve.attandence === '是') {
            // 如果匹配，则增加计数
            attandenceCount++
          }
        })

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
            // totalFINSalary = coursesFIN * coachSalary
            // totalFINCourseCount += coursesFIN
            totalFINSalary = attandenceCount * coachSalary
            totalFINCourseCount += attandenceCount
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
  console.log('BBBFINcourseTotal', courseTypeFINData)
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
  // const courseInfo = []
  // // 遍历 JSON 数据并整理课程信息
  // nJson.forEach((categoryItem) => {
  //   if (categoryItem.category === 'class' && categoryItem.classDetail) {
  //     categoryItem.classDetail.forEach((classItem) => {
  //       const courseLeft = parseInt(classItem.courseLeft) || 0
  //       const coursesFIN = parseInt(classItem.coursesFIN) || 0

  //       courseInfo.push({
  //         classID: classItem.classID,
  //         courseLeft,
  //         coursesFIN
  //       })
  //     })
  //   }
  // })

  // const coachInfo2 = {}

  // // 遍历 JSON 数据并根据 coach 对教练进行分类
  // nJson.forEach((categoryItem) => {
  //   if (categoryItem.category === 'class' && categoryItem.classDetail) {
  //     categoryItem.classDetail.forEach((classItem) => {
  //       const coach = classItem.coach[0] // 假设每个班级只有一个教练
  //       const coachID = coach.coachID
  //       const coachName = coach.coachName

  //       if (!coachInfo2[coachID]) {
  //         coachInfo2[coachID] = {
  //           coachName,
  //           courseLeftTotal: 0,
  //           coursesFINTotal: 0
  //         }
  //       }

  //       const courseLeft = parseInt(classItem.courseLeft) || 0
  //       const coursesFIN = parseInt(classItem.coursesFIN) || 0

  //       coachInfo2[coachID].courseLeftTotal += courseLeft
  //       coachInfo2[coachID].coursesFINTotal += coursesFIN
  //     })
  //   }
  // })

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

  //課程核銷相關---------------------------------------------------
  const classInfo = []
  //const currentDateMonth = formattedCurrentDateTime // 用於測試的月份
  // 遍历包含 class 信息的数组
  nJson.forEach((categoryItem) => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach((classItem) => {
        // 初始化变量来计算本月的 attandence 次数
        let attandenceCount = 0
        // 遍历课程的 reserveDetail 数组
        classItem.reserveDetail.forEach((reserve) => {
          // 获取 reserveDate 的月份部分
          const reserveMonth =
            reserve.reserveDate.split('-')[0] + '-' + reserve.reserveDate.split('-')[1]
          // 检查月份是否与当前月份匹配，并且 attandence 是否为 "是"
          if (reserveMonth === formattedCurrentDateTime && reserve.attandence === '是') {
            // 如果匹配，则增加计数
            attandenceCount++
          }
        })

        const classData = {
          classID: classItem.classID,
          coursesAll: classItem.coursesAll,
          coursesFIN: classItem.coursesFIN,
          courseLeft: classItem.courseLeft,
          //計算本月其課堂attandence次數
          attandenceCount: attandenceCount
        }

        // 将提取的班级信息添加到结果数组中
        classInfo.push(classData)
      })
    }
  })
  // 输出结果
  console.log('AAAclassInfo', classInfo)

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
  console.log('BBBmergeInfo', mergeInfo)

  //計算本月核銷課堂數--（courseAll-attandence次數）並以教練分類--------------------
  //在上方classInfo已經有計算courseAll現在在上方的判斷中將attandence次數計算進去
  //舊的算法是直接計算courseLeft

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
    revenueDateMonth: currentDateTime.toFormat('yyyy-MM'), // 自动生成当前年份和月份
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
        const parts = revenue.revenueDateMonth.split('-')
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

  //11月之後寫的---------------------------------------------------------------------------------------------11月之後寫的

  //pick date
  //selectDate選的月份
  //displayText顯示的月份
  //當選擇不同月份做不同計算、以以下useEffect做動態改變
  const [selectedDate, setSelectedDate] = useState(null)
  const [displayText, setDisplayText] = useState('請選擇月份')

  //文字化 X月份
  const [displayMonth, setDisplayMonth] = useState('某月份')
  const [displayMonth2, setDisplayMonth2] = useState('某月份') //minus a month

  const [totalSalarySumDisplay, setTotalSalarySumDisplay] = useState(10)

  const [newTotalSumFINDisplay, setNewTotalSumFINDisplay] = useState(20)

  // const updateMinusMonth = () => {
  //   const currentMonth = displayMonth.replace('月', '')
  //   // 將 '02月' 轉換為日期對象，這裡將年份設為固定值，例如 2022
  //   const dateObj = new Date(`2022-${currentMonth}-01`)
  //   console.log('monthDatadateObj', dateObj)
  //   // 減去一個月
  //   dateObj.setMonth(dateObj.getMonth() - 1)
  //   // 取得新的月份，並格式化為 'MM月'
  //   let minusMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0') + '月'
  //   //console.log('monthData-1',minusMonth); // minus a month
  //   if (minusMonth === 'NaN月') {
  //     minusMonth = '某月份'
  //   }
  //   console.log('monthData-1DD', minusMonth) // minus a month
  // }

  //轉換方式
  //date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit' }).replace(/\//g, '-');
  //setSelectedDate(date);

  //渲然table的月份
  useEffect(
    () => {
      if (selectedDate) {
        //月份的header呈現
        const selectFormattedDate = selectedDate
          .toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit'
          })
          .replace(/\//g, '-')
        setDisplayText(`${selectFormattedDate}`)
        const formattedMonth = selectedDate.toLocaleDateString('zh-TW', {
          month: '2-digit'
        })
        setDisplayMonth(`${formattedMonth}`)
      } else {
        setDisplayText('請選擇月份')
        setDisplayMonth('某月份')
      }
      //countTotalSalary()
    },
    [selectedDate],
    [displayText]
  )

  //即時渲染計算總收入
  useEffect(() => {
    countTotalSalary()
    setTotalSalarySumDisplay(totalSalarySum)

    //console.log('totalSalarySumDisplay', totalSalarySumDisplay)

    getBuyFormThreeDetailData()
    getAttandenceFormFourDetailData()
    setNewTotalSumFINDisplay(newTotalSumFIN)
    getAbsentFormFiveDetailData()
    getAbsentFormFiveDetailDataByFilter()
  }, [displayText])

  useEffect(() => {
    updateTable()
  }, [newData])

  //簽約總收入 - 以月份分類---------------------------------------------------
  //note: 本月學生的錢加總（buydate區分月份）學生下面的buydetail、coursePrice去乘

  //用來計算的變數
  let totalSalarySum = 0

  //coursePriceByMonth記錄每個月的收入、以月份分類/課程類型、金額***************
  const coursePriceByMonth = {}

  //courseAllByMonth記錄每個月的簽約堂數、以月份分類/課程類型、堂數***************
  const coursesAllByMonth = {}

  // 遍歷json的資料
  //改成function 計算簽約總收入
  const countTotalSalary = () => {
    nJson.forEach((item) => {
      if (item.category === 'student' && item.stuDetail) {
        item.stuDetail.forEach((studentItem) => {
          studentItem?.buyDetail.forEach((buyItem) => {
            const buyDate = buyItem.buyDate
            const courseType = buyItem.courseType || '未知'
            const coursePrice = parseInt(buyItem.coursePrice) || 0 // 解析课程价格字段

            // 與學生簽約堂數計算（買課堂數）
            const coursesAll = parseInt(buyItem.coursesAll) || 0 // 簽約堂數

            // 添加错误检查：如果没有 buyDate 字段或其值为空，则跳过此项
            if (!buyDate) {
              return
            }

            // 解析日期為月份 "yyyy/MM"
            const dateParts = buyDate.split('-')
            if (dateParts.length !== 3) {
              // 如果日期格式不正确，则跳过此项
              return
            }
            const month = dateParts.slice(0, 2).join('-')

            // 如果月份不存在，创建一个月份的记录
            if (!coursePriceByMonth[month]) {
              coursePriceByMonth[month] = {}
            }

            // 如果课程类型不存在，创建一个课程类型的记录
            if (!coursePriceByMonth[month][courseType]) {
              coursePriceByMonth[month][courseType] = 0
            }

            // 累加课程价格
            coursePriceByMonth[month][courseType] += coursePrice

            // 如果月份不存在，创建一个月份的记录
            if (!coursesAllByMonth[month]) {
              coursesAllByMonth[month] = {}
            }
            // 與學生簽約堂數計算（買課堂數）
            if (!coursesAllByMonth[month][courseType]) {
              coursesAllByMonth[month][courseType] = 0
            }
            // 累加课程次數
            coursesAllByMonth[month][courseType] += coursesAll
          })
        })
      }
    })
    console.log('is counted coursepriccc', coursePriceByMonth)
    console.log('is counted courseAllByMonth', coursesAllByMonth)

    // list all price by month
    for (const month in coursePriceByMonth) {
      // get the data by month->courseType及月份分類簽約金額
      const monthData = coursePriceByMonth[month]

      console.log('itemData month is', month)
      console.log('itemData', monthData)
      console.log('the chosen month iss', displayText)

      const monthCountData = coursesAllByMonth[month]
      console.log('is counted selected monthCountData', monthCountData)

      //比對選擇的日期
      //formattedCurrentDateTime是本月月份
      //將formattedCurrentDateTime(本月月份)改成選擇的月份
      //if (month === formattedCurrentDateTime) {

      console.log('is counted selected month', month)
      console.log('is counted selected fomated', displayText)
      if (month.toString() === displayText.toString()) {
        console.log('有該月份資料')

        console.log('is counted monthData', monthData)
        for (const courseType in monthData) {
          totalSalarySum += monthData[courseType]
        }
        console.log('totalSalarySum總簽約收入', totalSalarySum)
      } else {
        console.log('沒有該月份資料')
      }
    }
  }

  //撈出所有的課程－教練下的學生資料（表三四五用）-----------------------------------------------------------

  //本月購買(簽約)
  const allBuyDetailDataFormThree = []
  const getBuyFormThreeDetailData = () => {
    //撈buyDetail -- buyDate,courseAll,coursePrice,invoiceNum
    //stuName在stuDetail下
    //用 coachName 去分類
    nJson.forEach((item) => {
      if (item.category === 'student' && item.stuDetail) {
        //紀錄學生資料並存成陣列
        //name
        item.stuDetail.forEach((studnetItem) => {
          const stuName = studnetItem.stuName
          studnetItem?.buyDetail.forEach((buyItem) => {
            const buyDate = buyItem.buyDate
            const courseAll = buyItem.coursesAll
            const coursePrice = buyItem.coursePrice
            const invoiceNum = buyItem.invoiceNum

            //分類用
            const coachName = buyItem.coachName
            const courseType = buyItem.courseType

            allBuyDetailDataFormThree.push({
              coachName,
              courseType,
              stuName,
              buyDate,
              courseAll,
              coursePrice,
              invoiceNum
            })
          })
        })

        console.log('DataFormThree', allBuyDetailDataFormThree)
      }
    })
  }

  //本月已核銷：有上課的課程＊堂薪-----------------------------------------------------------表四
  //獲取所有的課程資料來計算
  const allAttandenceDetailDataFormFour = []
  const allCoachSalayDataFormFour = []

  const mergeAttandenceAndSalaryArray = []

  let newTotalSumFIN = 0

  const getAttandenceFormFourDetailData = () => {
    //撈reserveDetail -- reserveDate,attandence
    //用 coachName 去分類
    nJson.forEach((item) => {
      if (item.category === 'class' && item.classDetail) {
        //紀錄資料並存成陣列
        item.classDetail.forEach((classItem) => {
          console.log('DataFormFouritem', classItem)
          const coachName = classItem?.coach[0]?.coachName

          const courseType = classItem.courseType

          const classID = classItem.classID

          //classDetail下的courseFin
          //並用classID去coachDetail下找堂薪
          const courseFin = classItem.coursesFIN

          classItem?.reserveDetail.forEach((reserveItem) => {
            const reserveDate = reserveItem.reserveDate
            const attandence = reserveItem.attandence
            const studentName = reserveItem.student[0]?.stuName
            allAttandenceDetailDataFormFour.push({
              studentName,
              coachName,
              courseType,
              classID,
              courseFin,
              reserveDate,
              attandence
            })
          })
        })

        //console.log('DataFormFour有上課之課程明細', allAttandenceDetailDataFormFour)
      }

      //用classID去coachDetail下找堂薪
      //列出所有並分類-- {classID:'x':salary:'堂薪'}
      //salary種類
      //"PtSalary":"800",
      //"PtSalary1v2":"1000",
      //"PilatesSalary1":"800",
      //"PilatesSalary2":"1000",
      //"exCoursePilatesSalary1":"700",
      //"exCoursePilatesSalary2":"1000",
      //"MassageSalary":"800",
      //"RentSalary":""
      if (item.category === 'coach' && item.coachDetail) {
        item.coachDetail.forEach((coachItem) => {
          const coachName = coachItem.coachName
          const classesID = coachItem.teachClass

          //salary種類
          const PtSalary = coachItem.PtSalary
          const PtSalary1v2 = coachItem.PtSalary1v2
          const PilatesSalary1 = coachItem.PilatesSalary1
          const PilatesSalary2 = coachItem.PilatesSalary2
          const exCoursePilatesSalary1 = coachItem.exCoursePilatesSalary1
          const exCoursePilatesSalary2 = coachItem.exCoursePilatesSalary2
          const MassageSalary = coachItem.MassageSalary
          const RentSalary = coachItem.RentSalary

          console.log('DataFormFourclassID', classesID)

          allCoachSalayDataFormFour.push({
            coachName,
            classesID,
            PtSalary,
            PtSalary1v2,
            PilatesSalary1,
            PilatesSalary2,
            exCoursePilatesSalary1,
            exCoursePilatesSalary2,
            MassageSalary,
            RentSalary
          })
          //console.log('DataFormFourallCoachSalayDataFormFour', allCoachSalayDataFormFour)
        })
      }
    })

    //將以上兩個陣列中的資料相乘
    //allAttandenceDetailDataFormFour
    //allCoachSalayDataFormFour
    console.log('DataFormFourallCoachSalayDataFormFour', allCoachSalayDataFormFour)
    console.log('DataFormFourallAttandenceDetailDataFormFour', allAttandenceDetailDataFormFour)

    //將coach的salary 依照classType來去 ＊ 堂數
    //major["PT1v1","PT1v2","基皮","高皮","運動按摩","場地租借","體驗高皮","體驗基皮","體驗PT1v2","體驗PT1v1"]
    //courseFIN
    allAttandenceDetailDataFormFour.forEach((attandenceItem) => {
      allCoachSalayDataFormFour.forEach((salaryItem) => {
        if (attandenceItem.coachName === salaryItem.coachName) {
          let salaryPerClass = ''
          let hasDonePrice = ''
          if (attandenceItem.courseType === 'PT1v1') {
            hasDonePrice = parseInt(salaryItem.PtSalary || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.PtSalary || 0
          } else if (attandenceItem.courseType === 'PT1v2') {
            hasDonePrice =
              parseInt(salaryItem.PtSalary1v2 || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.PtSalary1v2 || 0
          } else if (attandenceItem.courseType === '基皮') {
            hasDonePrice =
              parseInt(salaryItem.PilatesSalary1 || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.PilatesSalary1 || 0
          } else if (attandenceItem.courseType === '高皮') {
            hasDonePrice =
              parseInt(salaryItem.PilatesSalary2 || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.PilatesSalary2 || 0
          } else if (attandenceItem.courseType === '體驗基皮') {
            hasDonePrice =
              parseInt(salaryItem.exCoursePilatesSalary1 || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.exCoursePilatesSalary1 || 0
          } else if (attandenceItem.courseType === '體驗高皮') {
            hasDonePrice =
              parseInt(salaryItem.exCoursePilatesSalary2 || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.exCoursePilatesSalary2 || 0
          } else if (attandenceItem.courseType === '運動按摩') {
            hasDonePrice =
              parseInt(salaryItem.MassageSalary || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.MassageSalary || 0
          } else if (attandenceItem.courseType === '場地租借') {
            hasDonePrice = parseInt(salaryItem.RentSalary || 0) * parseInt(attandenceItem.courseFin)
            salaryPerClass = salaryItem.RentSalary || 0
          } else {
            hasDonePrice = 0
            salaryPerClass = 0
          }

          mergeAttandenceAndSalaryArray.push({
            ...attandenceItem,
            ...salaryItem,
            hasDonePrice,
            salaryPerClass
          })
        }
      })
    })
    console.log('DataFormFourmergeAttandenceAndSalaryArray', mergeAttandenceAndSalaryArray)

    //將以上的price相加----為本月已核銷課程總收入-----須以月份分類

    //let totalFINCourseCount = 0
    mergeAttandenceAndSalaryArray.forEach((item) => {
      if (
        item.reserveDate.split('-')[0] + '-' + item.reserveDate.split('-')[1] === displayText &&
        item.attandence === '是'
      ) {
        //console.log('DataFormFouritem', item)
        newTotalSumFIN += parseInt(item.salaryPerClass)
        //console.log('DataFormFournewTotalSumFIN', newTotalSumFIN)
        //totalFINCourseCount += parseInt(item.coursesFIN)
      }
    })
    console.log('DataFormFournewTotalSumFINLast', newTotalSumFIN) //本月已核銷課程總收入 title顯示的部分
  }

  //計算未核銷課程form five--------------------------------------------------------------------------------------------------------表五
  const allAbsentDetailDataFormFive = []
  //欄位：coachName, coursetype, buyDate, studentName,buy堂數,已核銷堂數coursesFIN,未核銷堂數courseLeft
  const getAbsentFormFiveDetailData = () => {
    //撈buyDetail -- buyDate,courseAll,coursesFIN,courseLeft

    nJson.forEach((item) => {
      if (item.category === 'student' && item.stuDetail) {
        //紀錄資料並存成陣列
        //console.log('DataFormFiveitem', item)
        item.stuDetail?.forEach((studentItem) => {
          const stuName = studentItem.stuName
          studentItem.buyDetail?.forEach((buyItem) => {
            const classID = buyItem.classID

            const buyDate = buyItem.buyDate
            const coachName = buyItem.coachName
            const courseType = buyItem.courseType

            const courseAll = buyItem.coursesAll
            const courseFin = buyItem.coursesFIN
            const courseLeft = buyItem.courseLeft

            allAbsentDetailDataFormFive.push({
              coachName,
              courseType,
              classID,
              stuName,
              buyDate,
              courseAll,
              courseFin,
              courseLeft
            })
          })
        })
      }
    })
    console.log('DataFormFiveallAbsentDetailDataFormFive', allAbsentDetailDataFormFive)
  }

  const getAbsentFormFiveDetailDataByFilter = () => {
    //須以月份分類
    allAbsentDetailDataFormFive.forEach((item) => {
      if (item.buyDate.split('-')[0] + '-' + item.buyDate.split('-')[1] === displayText) {
        console.log('DataFormFiveitemByMonth', item)
      }
    })
  }

  //update table
  const updateTable = () => {
    newData[0].finCourse = '210'
    newData[0].coaches[0].finCourse = '21'
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: 'white' }}>
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10 container margin-left-right">
          <div className="table-container">
            <h1 className="title">金流</h1>
            <div className="row">
              <div className="col-4">
                <div>{displayText}月簽約總收入</div>
                {/* x月要計算 */}
                <h1 className="money-title mt-2 title">$ {totalSalarySumDisplay}</h1>
              </div>
              <div className="col-4">
                <div>{displayText}月核銷課總收入</div>
                {/* x月要計算 */}
                {/* <h1 className="money-title mt-2 title">$ {totalSalarySum ?? '0'}</h1> */}
                <h1 className="money-title mt-2 title">$ {newTotalSumFINDisplay}</h1>
              </div>
              <div
                className="col-4 revenue-export-btn"
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <DatePicker
                  portalId="root-portal"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  isClearable
                  placeholderText="輸入月份"
                  popperClassName="some-custom-class"
                  popperPlacement="right-end"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10]
                      }
                    },
                    {
                      name: 'preventOverflow',
                      options: {
                        rootBoundary: 'viewport',
                        tether: false,
                        altAxis: true
                      }
                    }
                  ]}
                />
                <button type="button" className="btn btn-golden revenue-btn-mr0">
                  匯出 PDF
                </button>
              </div>
            </div>
            {/* <RevenueSetTable classes={classes} columns={columnsRevenue}/> */}
            <RevenueSetTable classes={newData} columns={columnsRevenue(displayMonth)} />
            {/* <h1 className="title  mt-4">核銷</h1>
            <div className="row">
              <div className="col-6">
                <div>已核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {totalSumFIN ?? '0'} / {classCountByMonth[formattedCurrentDateTime] ?? '0'}堂 */}
            {/* $ {totalSumFIN} / {totalFINCourseCount}堂 */}
            {/* </h1>
              </div>
              <div className="col-6">
                <div>未核銷</div>
                <h1 className="money-title mt-2 title"> */}
            {/*new*/}
            {/* $ {totalSumLeft} / {courseLeftByMonth}堂 */}
            {/*old$ {totalSumLeft ?? '0'} / {totalLeftCourseCount ?? '0'}堂*/}
            {/* </h1>
              </div>
            </div>
            <RevenueSetTable classes={mergeInfoLast} columns={columnsMoney} /> */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
