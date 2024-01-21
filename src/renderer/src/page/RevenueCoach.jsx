import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import RevenueCoachDetail from '../components/RevenueCoachDetail'
import GoBackBTN from '../components/GoBackBTN'
import { columnsTotal, columnsFin, columnsLeft } from '../components/RevenueCoachColumns'
import { DateTime } from 'luxon'
import { CoachExportPDF } from '../components/ExportPdf'
import '../font/JhengHei-bold.js'
function RevenueCoach({ classes }) {
  const { courseID, coachID, month } = useParams()
  console.log('courseID in revenueCoach', courseID, coachID, month) //course name - PT 1v1 何軒 02月

  //console.log('classes in revenueCoach', classes)

  let coachThridData = []
  classes.forEach((item) => {
    if (item.coachesDetailFormThree && item.courseType === courseID) {
      item.coachesDetailFormThree.forEach((coach) => {
        if (coach.coachName === coachID ) {
          console.log('coach', coach)
          coachThridData.push(coach)
        }
      })
    }
  })
  

  let coachFourthData = []
    classes.forEach((item) => {
        if (item.coachesDetailFormFour && item.courseType === courseID) {
            item.coachesDetailFormFour.forEach((coach) => {
                if (coach.coachName === coachID ) {
                    console.log('coachFourthDatacheckcoach', coach.coachName+' '+coachID)
                    coachFourthData.push(coach)
                }
            })
        }
    })
    console.log('coachFourthData', coachFourthData)
  
    let coachFifthData = []
    classes.forEach((item) => {
        if (item.coachesDetailFormFive && item.courseType === courseID) {
            console.log('coachFifthDatacheck', item.coachesDetailFormFive)
            item.coachesDetailFormFive.forEach((coach) => {
                if (coach.coachName === coachID) {
                    console.log('coachFifthDatacheckcoach', coach.coachName+' '+coachID)
                    coachFifthData.push(coach)
                }
            })
        }
    })
    console.log('coachFifthData', coachFifthData)




  // let coachData = !!coachAllData && coachAllData.coaches.find(
  //     (x) => x.coachName === coachID
  // ) || {};

  // const totalData = coachData.total || []
  // const finData = coachData.fin || []
  // const leftData = coachData.left || []

  let totalData
  if (coachThridData == undefined) {
    totalData = []
  } else {
    totalData = coachThridData || []
  }
  console.log('totalData', totalData)

  let finData
  if (coachFourthData == undefined) {
    finData = []
  } else {
    finData = coachFourthData || []
  }
  console.log('finData', finData)

  let leftData
  if (coachFifthData == undefined) {
    leftData = []
  } else {
    leftData = coachFifthData || []
  }
  console.log('leftData', leftData)

  // const totalData =  []
  // const finData =  []
  // const leftData =  []

  //console.log('courseData data', courseID, coachID, coachData,coachAllData, totalData, finData, leftData)

  console.log('selectedMonthValue in revenueCoach', month)

  //month
  const monthValue = month

  //count total money 簽約灰色字
    let totalMoney = 0
    totalMoney = totalData[totalData.length - 1]?.countCoursePrice

    //count fin money 已核銷灰色字
    let finMoney = 0
    finData.forEach((item) => {
        //finMoney += item.hasDonePrice
    })
    //count fin course num 已核銷灰色字
    let finCourse = 0
  finData.forEach((item) => {
    if(item.courseFin !== undefined){
    finCourse = item.courseFin
    }
  })

    //count fin salaryperclass 已核銷灰色字
    let salaryPerClass = 0
    finData.forEach((item) => {
        if(item.salaryPerClass !== undefined){
        salaryPerClass = item.salaryPerClass
        }
    })


  //pdf export use - filter origin data
    let totalDataOrigin = []
    let finDataOrigin = []
    let leftDataOrigin = []
    totalData.forEach((item) => {
        let data = {
            buyDate: item.buyDate,
            stuName: item.stuName,
            courseAll: item.courseAll,
            coursePrice: item.coursePrice,
            invoiceNumber: item.invoiceNumber
        }
        totalDataOrigin.push(data)
        })
    finData.forEach((item) => {
        let data = {
            reserveDate: item.reserveDate,
            studentName: item.studentName,
            courseFin: item.courseFin,
            hasDonePrice: item.hasDonePrice,
            salaryPerClass: item.salaryPerClass
        }
        finDataOrigin.push(data)
        }
    )
    leftData.forEach((item) => {
        let data = {
            buyDate: item.buyDate,
            stuName: item.stuName,
            courseAll: item.courseAll,
            courseFin: item.courseFin,
            courseLeft: item.courseLeft
        }
        leftDataOrigin.push(data)
        }
    )


  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10 container margin-left-right">
          <div className="table-container">
            <div className="title_word2">
              <GoBackBTN />
              <h1 className="title">{coachID}</h1>
            </div>
            <div className="mb-5">
              <div className="title_word2 mb-3" style={{ justifyContent: 'space-between' }}>
                <div className="title_word2">
                  <span className="money-title">{monthValue}簽約</span>
                  <span className="money-title2 ml-5">簽約金額：$ {totalMoney}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-golden revenue-btn-mr0"
                  onClick={() =>
                    CoachExportPDF(totalDataOrigin, 'X月簽約', [
                      '購買日期',
                      '學員',
                      '堂數',
                      '金額',
                      '發票號碼'
                    ])
                  }
                >
                  匯出 PDF
                </button>
              </div>
              <RevenueCoachDetail classes={classes} data={totalData} columns={columnsTotal} />
            </div>
            <div className="mb-5">
              <div className="title_word2 mb-3" style={{ justifyContent: 'space-between' }}>
                <div className="title_word2">
                  <span className="money-title">{monthValue}已核銷</span>
                  <span className="money-title2 ml-5">
                    核銷金額：$ {finMoney} / 堂薪：$ {salaryPerClass} / 堂數：{finCourse}堂
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-golden revenue-btn-mr0"
                  onClick={() =>
                    CoachExportPDF(finDataOrigin, 'X月已核銷', [
                      '上課日期',
                      '學員',
                      '堂數',
                      '金額',
                      '堂薪'
                    ])
                  }
                >
                  匯出 PDF
                </button>
              </div>
              <RevenueCoachDetail classes={classes} data={finData} columns={columnsFin} />
            </div>
            <div className="mb-5">
              <div className="title_word2 mb-3" style={{ justifyContent: 'space-between' }}>
                <div className="title_word2">
                  <span className="money-title">{monthValue}未核銷</span>
                </div>
                <button
                  type="button"
                  className="btn btn-golden revenue-btn-mr0"
                  onClick={() =>
                    CoachExportPDF(leftDataOrigin, 'X月未核銷', [
                      '購買日期',
                      '學員',
                      '購買堂數',
                      '已核銷堂數',
                      '未核銷堂數'
                    ])
                  }
                >
                  匯出 PDF
                </button>
              </div>
              <RevenueCoachDetail classes={classes} data={leftData} columns={columnsLeft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueCoach
