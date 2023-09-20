import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import {
    Box,
    IconButton,
    Tooltip,
  } from '@mui/material';
  import { Delete } from '@mui/icons-material';
  import jsonData from '../json/new_class.json'

function ClassDetailTable({ classes }) {
    let detailData = []
    for (let i = 0; i < classes.reserveDetail.length; i++) {
        detailData.push(classes.reserveDetail[i])
    }

    const stuClassBuyDetail = []
    //先從classDetail的reserveDetail看每次上課的學生有哪些，找到學生，再找他的classID，之後修改資料
    // const whichStus = detailData.student.find(item => item.classID === "student");
    // const stuBuyDetail = jsonData.find(item => item.category === "student");
    detailData.forEach(item => {
        item.student.forEach(names => {
            stuClassBuyDetail.push(names.stuID)
    
        })
    })
    //   console.log("stuBuyDetail",stuBuyDetail)

      console.log("stuClassBuyDetail",stuClassBuyDetail)

    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState(() => detailData);

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);
    
    const handleSaveCell = useCallback(
        (cell, value, classes) => {
            console.log("test01",cell.row.original)
            console.log("test02",value)
        if ( tableData[cell.row.index][cell.column.id] !== value){
            //send api delete request here, then refetch or update local table data for re-render
            tableData[cell.row.index][cell.column.id] = value;
            console.log("test03",cell.row.original.attandence)
            if ( cell.row.original.cancel == "否" && cell.row.original.attandence == "是"){
                //預約且來了，扣課堂數
                classes.coursesFIN = parseInt(classes.coursesFIN, 10) + 1
                classes.courseLeft = parseInt(classes.courseLeft, 10) - 1
                console.log("預約且來了，扣課堂數")
                console.log("attandence",classes.coursesFIN)
                console.log("courseLeft",classes.courseLeft)
            }
            else if ( cell.row.original.cancel == "是" && cell.row.original.attandence == "是"){
                //取消預約卻出現
                !confirm(`學生出席跟預約有錯誤，不會取消預約卻來上課`)
                console.log("錯誤")
            }
            else if ( cell.row.original.cancel == "是" && cell.row.original.attandence == "否"){
                //取消預約，課堂數回來
                classes.coursesFIN = parseInt(classes.coursesFIN, 10) - 1
                classes.courseLeft = parseInt(classes.courseLeft, 10) + 1
                console.log("取消預約，課堂數回來")
                console.log("coursesFIN",classes.coursesFIN)
                console.log("courseLeft",classes.courseLeft)
            }
            else if ( cell.row.original.cancel == "否" && cell.row.original.attandence == "否"){
                //預約了，但沒來上課
                classes.coursesFIN = parseInt(classes.coursesFIN, 10) + 1
                classes.courseLeft = parseInt(classes.courseLeft, 10) - 1
                console.log("預約了，但沒來上課")
                console.log("attandence",classes.coursesFIN)
                console.log("courseLeft",classes.courseLeft)
            }
        }
            setTableData([...tableData]); //re-render with new data
           
            // console.log("test",cell.row.original.attandence)
        },
        [tableData],
      );

      console.log("classes",classes)
    const handleDeleteRow = useCallback(
        (row) => {
          if (
            !confirm(`確定刪除此欄資料`)
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [tableData],
      );

    console.log("tableData",tableData)
    const columns = [ //表格有的資料
        {
            accessorFn: (row) => {
                const newData = row.student.map((item) => {
                    const students = []
                    students.push(item.stuName)
                    return students
                })
                return `${newData.join("、")} `
              },
            id:"attendanceStu",
            header:"上課學生",
            size:150,
            enableEditing: false
        },
        {
            accessorKey:"reserveDate",
            header:"日期",
            size:100,
        },
        {
            accessorKey:"reserveTime",
            header:"時間",
            size:100,
        },
        {
            accessorKey:"attandence",
            header:"是否來上課",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"cancel",
            header:"取消預約",
            // id:"cansole", 影響編輯
            //影響說明：雖然值一樣，但是如果用滑鼠再框格中點一下取消反白，或是點擊框框中的文字也會被視為修改資料，單單出席跟取消預約有問題
            size:50,
            enableSorting: false,
        },
        {
            accessorKey:"note",
            header:"備註",
            size:200,
            enableSorting: false
         }
    ];


  return (

    <MaterialReactTable 
        columns={columns}
        data={tableData} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enabled
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        enableFacetedValues          
        // enableRowSelection
        enableRowActions
        // getRowId={(row) => row.userId} //give each row a more useful id
        // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        // state={{ rowSelection }} //pass our managed row selection state to the table to use
        editingMode="cell"
        enableEditing 
        renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Box>
          )}
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onBlur: (event) => {
            handleSaveCell(cell, event.target.value, classes);
            },
        })}
        renderBottomToolbarCustomActions={() => (
            <Typography sx={{  p: '16px', fontWeight:"900" }} variant="body2">
                雙擊要修改的內容進行修改
            </Typography>
        )}  
        localization={{
            header: {
              actions: '',
            }
          }}           
        // renderTopToolbarCustomActions={({ table ,detailData}) => {

        //     return (
        //         <div style={{ display: 'flex', gap: '0.5rem' }}>
        //         <button onClick={()=> console.log(table.getRowModel().rows)}>ppp</button>
        //         <button onClick={()=> console.log(detailData)}>pp0</button>
        //         <button onClick={()=> console.log(detailData.reserveDetail[0])}>p</button>
        //         </div>
        //     );
        //     }}  
    />

  )
}

export default ClassDetailTable