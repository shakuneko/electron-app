import React, { useState, useEffect, useCallback } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Link, useParams } from 'react-router-dom'

function RevenueCourseDetail(props) {
  const courseData = props.courseData
  console.log('props', props, courseData)

  const monthData = props.monthValue
  console.log('monthData', monthData)
  const currentMonth = monthData.replace('月', '');

  // 將 '02月' 轉換為日期對象，這裡將年份設為固定值，例如 2022
const dateObj = new Date(`2022-${currentMonth}-01`);
console.log('monthDatadateObj',dateObj)
// 減去一個月
dateObj.setMonth(dateObj.getMonth() - 1);
// 取得新的月份，並格式化為 'MM月'
let minusMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0') + '月';
//console.log('monthData-1',minusMonth); // minus a month
if (minusMonth === 'NaN月') {
  minusMonth = '某月份'
}
  const columns = [
    //表格有的資料
    {
      accessorKey: 'coachName',
      header: '教練名稱',
      size: 100,
      filterVariant: 'select',
      Cell: ({ renderedCellValue }) => {
        // console.log(renderedCellValue)
        return (
          <Link
          //route-- /revenue/:courseID/:coachID/:month
            to={`/revenue/${props.courseID}/${renderedCellValue}/${monthData}`}
            className="table-link-underline-none revenue-link"
          >
            {renderedCellValue}{' '}
          </Link>
        )
      }
    },
    {
      accessorFn: (row) => `$ ${row.preLeftMoney} / ${row.preLeftCourse}堂`,
      id: 'preMonthLeft',
      size: 100,
      header: `${minusMonth}未核銷 (金額 / 堂)`,
    },
    {
      accessorFn: (row) => `$ ${row.totalMoney} / ${row.totalCourse}堂`,
      id: 'thisMonthTotal',
      header: `${monthData}簽約  (金額 / 堂)`,
      size: 100
    },
    {
      accessorFn: (row) => `$ ${row.finMoney} / ${row.finCourse}堂`,
      id: 'thisMonthFin',
      header: `${monthData}已核銷 (金額 / 堂)`,
      size: 100
    },
    {
      accessorFn: (row) => `$ ${row.leftMoney} / ${row.leftCourse}堂`,
      id: 'thisMonthLeft',
      header: `${monthData}未核銷 (金額 / 堂)`,
    },
    {
      accessorKey: 'exCourseTotal',
      header: 'PT 體驗課堂數',
      size: 100
    }
  ]

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={props.courseData}
        initialState={{
          showGlobalFilter: true
        }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enable
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        enableFacetedValues
        muiSearchTextFieldProps={{
          placeholder: '搜尋想查找的資料',
          sx: { minWidth: '300px' }
        }}
      />
    </div>
  )
}

export default RevenueCourseDetail
