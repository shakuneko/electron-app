import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import ClassTableDetail from "./ClassTableDetail"


function ClassDetailTable({ testClass }) {
    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    const [tableData, setTableData] = useState(() => testClass);

    const handleSaveCell = (cell, value) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
      tableData[cell.row.index][cell.column.id] = value;
      //send/receive api updates here
      setTableData([...tableData]); //re-render with new data
    };

    const columns = [ //表格有的資料
        // {
        //     accessorKey:"createDate",
        //     header:"日期",
        //     size:100,
        // },
        // {
        //     accessorKey:"student.reserveTime",
        //     header:"時間",
        //     size:100,
        // },
        // {
        //     accessorKey:"student.exCourse",
        //     header:"是否來上課",
        //     size:100,
        //     enableSorting: false
        // },
        // {
        //     accessorKey:"student.exCourse",
        //     header:"取消預約",
        //     id:"cansole",
        //     size:50,
        //     enableSorting: false
        // },
        {
            accessorKey:"note",
            header:"備註",
            size:100,
            enableSorting: false
        }
    ];


  return (
    <div>
        {testClass.note}
        <button onClick={console.log(testClass)}>b</button>
        <MaterialReactTable 
            columns={columns}
            data={testClass} 
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
            editingMode="cell"
            enableEditing     
            muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                //onBlur is more efficient, but could use onChange instead
                onBlur: (event) => {
                handleSaveCell(cell, event.target.value);
                },
            })}
            renderBottomToolbarCustomActions={() => (
                <Typography sx={{  p: '16px', fontWeight:"900" }} variant="body2">
                    雙擊要修改的內容進行修改
                </Typography>
            )}               
        />
    </div>
   
  )
}

export default ClassDetailTable