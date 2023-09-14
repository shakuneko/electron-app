import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'

function CoachDetailTable({ classes }) {
  let stuData = []
  for (let i = 0; i < classes.student.reserveDetail.length; i++) {
    stuData.push(classes.student.reserveDetail[i])
  }
  console.log('aaabclasses:', stuData)

  //optionally, you can manage the row selection state yourself
  const [rowSelection, setRowSelection] = useState({})

  //console.log('aaaclasses:', detailData)
  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection });
  }, [rowSelection])

  const columns = [
    //表格有的資料
    {
      accessorKey: 'stuName',
      header: '學員',
      size: 100
    },
    {
      accessorKey: 'reserveDate',
      header: '日期',
      size: 100
    },
    {
      accessorKey: 'reserveTime',
      header: '時間',
      size: 100,
      enableSorting: false
    },
    {
      accessorKey: 'attandence',
      header: '是否來上課',
      size: 50,
      enableSorting: false
    },
    {
      accessorKey: 'cancel',
      header: '取消預約',
      size: 100,
      enableSorting: false
    },
    {
      accessorKey: 'note',
      header: '備註',
      size: 100,
      enableSorting: false
    }
  ]

  return (
    <MaterialReactTable
      columns={columns}
      data={stuData}
      initialState={{ showGlobalFilter: true }} //show filters by default
      enableColumnActions={false} //no need for column actions if none of them are enabled
      enableDensityToggle={false} //density does not work with memoized table body
      enableFullScreenToggle={false}
      enableHiding={false} //column hiding does not work with memoized table body
      enableStickyHeader
      enableFacetedValues
      enableRowSelection
      getRowId={(row) => row.userId} //give each row a more useful id
      onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      state={{ rowSelection }} //pass our managed row selection state to the table to use
    />
  )
}

export default CoachDetailTable
