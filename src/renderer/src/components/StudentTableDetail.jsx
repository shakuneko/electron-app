import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { CheckOut } from "./TableSelectOptions"

function StudentTableDetail({classes}) {

    const CheckOut = ({renderedCellValue}) => { //設定查看按鈕要進入的頁面
        return<>
           <Link to={`/student/name/${renderedCellValue}`} className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">查看{renderedCellValue}</button> 
            </Link>
        </>
    };

    const columns = [ //表格有的資料
        {
            accessorKey:"student.stuName",
            header:"學員",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"student.stuGender",
            header:"性別",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"student.stuPhone",
            header:"電話",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"student.createDate",
            header:"建檔日期",
            size:100,
        },
        {
            accessorKey:"student.stuNote",
            header:"備註",
            size:150,
            enableSorting: false
        },
        {
            accessorKey:"student.stuName",
            id:"changePage",
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
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        renderTopToolbarCustomActions={() => (
            <Link to="/student/form" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增學員</button> 
            </Link>
        )}
                                
    />
                
  )
}

export default StudentTableDetail