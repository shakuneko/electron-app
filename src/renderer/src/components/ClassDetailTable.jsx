import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';

function ClassDetailTable({ classes }) {
    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    const columns = [ //表格有的資料
        {
            accessorKey:"createDate",
            header:"日期",
            size:100,
        },
        {
            accessorKey:"reserveTime",
            header:"時間",
            size:100,
        },
        {
            accessorKey:"exCourse",
            header:"是否來上課",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"exCourse",
            header:"取消預約",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"note",
            header:"備註",
            size:100,
            enableSorting: false
        }
    ];


  return (
    <MaterialReactTable 
        columns={columns}
        data={classes} 
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

export default ClassDetailTable