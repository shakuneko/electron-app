import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';

function ClassDetailTable({ classes }) {

    let detailData = []
    
    for (let i = 0; i < classes.reserveDetail.length; i++) {
        detailData.push(classes.reserveDetail[i])
        
    }

    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    const [tableData, setTableData] = useState(() => detailData);

    const handleSaveCell = (cell, value) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
      tableData[cell.row.index][cell.column.id] = value;
      //send/receive api updates here
      setTableData([...tableData]); //re-render with new data
    };


    const columns = [ //表格有的資料
        {
            accessorKey:"reserveDate",
            header:"日期",
            size:100,
        },
        {
            accessorFn: (row) => `${row.reservetime} `,
            id:"time",
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
            id:"cansole",
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
        data={detailData} 
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