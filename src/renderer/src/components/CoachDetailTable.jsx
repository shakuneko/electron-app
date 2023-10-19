import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table'
import React, { useEffect, useCallback, useState } from 'react';
// import newJson from '../json/new_class.json'
import { selectOptions, CheckOut, splitData } from './TableSelectOptions'
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateTableData } from '../redux/Actions/saveActions'; // 导入您的更新动作
import { addReserveTableData } from "../redux/reducers/saveSlice"

function CoachDetailTable({ classes, tableData, setTableData }) {
  //optionally, you can manage the row selection state yourself
  const dispatch = useDispatch();


  // const [tableData, setTableData] = useState(() => reserveData);
  // const handleDeleteRow = useCallback( //  儲存刪除
  // (row) => {
  //     if (
  //       !confirm(`確定刪除此欄資料`)
  //     ) {
  //       return;
  //     }
  //     //send api delete request here, then refetch or update local table data for re-render
  //     // tableData.splice(row.index, 1);
  //     setTableData([...tableData]);
  //     const newTableData = tableData.filter((item, index) => index !== row.index);
  //     dispatch(updateTableData(newTableData));
  //     dispatch(addReserveTableData({data: newTableData, classID: id}));
  //   },
  //   [tableData],
  // );

  const columns = [
    //表格有的資料
    // {
    //   id:"delete",
    //   header:"刪除",
    //   Cell:({ row }) => {
    //     return <>
    //     <Box sx={{ display: 'flex' }}>
    //       <Tooltip arrow placement="right" title="Delete">
    //           <IconButton color="error" onClick={() => handleDeleteRow(row)}>
    //               <Delete />
    //           </IconButton>
    //       </Tooltip>
    //     </Box>
    //     </>

    //   },
    //   size:50,
    // },
    {
      accessorFn: (row) => `${row.student[0].courseType} `,
      id:"courseType",
      header: '課程種類',
      size: 50,
      filterVariant: 'select',
    },
    {
      accessorFn: (row) => {
                
        const newData = row.student.map((item) => {
            const students = []
            students.push(item.stuName)
            return students
        })
        return `${newData.join("、")} `
      },
      id:"student",
      header: '學員',
      size: 100,
      filterVariant: 'select',
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
      size: 50,
      enableSorting: false
    },
    {
      accessorKey: 'note',
      header: '備註',
      size: 150,
      enableSorting: false
    }
  ]

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      initialState={{ 
        showGlobalFilter: true,
        sorting: [
          { id: 'reserveDate', desc: true }, //sort by classID in descending order by default
      ],
       }} //show filters by default
      enableColumnActions={false} //no need for column actions if none of them are enabled
      enableDensityToggle={false} //density does not work with memoized table body
      enableFullScreenToggle={false}
      enableHiding={false} //column hiding does not work with memoized table body
      enableStickyHeader
      enableFacetedValues
      // enableRowSelection
      // getRowId={(row) => row.userId} //give each row a more useful id
      // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      // state={{ rowSelection }} //pass our managed row selection state to the table to use
      // enableRowActions
      // renderRowActions={({ row }) => (
      //   <Box sx={{ display: 'flex', gap: '1rem' }}>
      //       <Tooltip arrow placement="right" title="Delete">
      //           <IconButton color="error" onClick={() => handleDeleteRow(row)}>
      //               <Delete />
      //           </IconButton>
      //       </Tooltip>
      //   </Box>
      // )}
      muiSearchTextFieldProps={{
        placeholder: "請輸入想查詢的學生及時間",
        sx: { minWidth: '300px' },
      }}
    />
  )
}

export default CoachDetailTable
