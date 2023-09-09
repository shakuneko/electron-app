import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { CheckOut } from "./TableSelectOptions"

function StudentTableDetail({classes}) {

    // const CheckOut = () => { //設定查看按鈕要進入的頁面
    //     return<>
    //        <Link to="/form" className='table-link-underline-none'>
    //             <button type="button" className="btn btn-golden">查看</button> 
    //         </Link>
    //     </>
    // };

    const columns = [ //表格有的資料
        {
            accessorKey:"student",
            header:"學員",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"stuGender",
            header:"性別",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"stuPhone",
            header:"電話",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"createDate",
            header:"建檔日期",
            size:100,
        },
        {
            accessorKey:"note",
            header:"備註",
            size:150,
            enableSorting: false
        },
        {
            accessorKey:"id",
            header:"操作",
            size:50,
            Cell: CheckOut,
            enableSorting: false

        }
    ];
    
  return (
    
    <MaterialReactTable 
        columns={columns}
        data={classes} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enabled
        // enableColumnFilters={false} //filtering does not work with memoized table body
        
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        // enableSorting={false} //sorting does not work with memoized table body
        enableStickyHeader
        renderTopToolbarCustomActions={() => (
            <Link to="/studentform" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增學員</button> 
            </Link>
        )}
                                
    />
                
  )
}

export default StudentTableDetail