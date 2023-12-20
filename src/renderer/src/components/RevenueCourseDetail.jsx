import React, { useState, useEffect, useCallback } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Link, useParams } from 'react-router-dom'

function RevenueCourseDetail(props) {
  const courseData = props.courseData
  console.log('props', props, courseData)

  const monthData = props.monthValue

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
      header: `${monthData}未核銷 (金額 / 堂)`,
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
