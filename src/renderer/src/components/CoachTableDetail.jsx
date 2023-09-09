import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { selectOptions, CheckOut } from './TableSelectOptions'

function CoachTableDetail({classes}) {

    // const CheckOut = () => { //設定查看按鈕要進入的頁面
    //     return<>
    //        <Link to="/form" className='table-link-underline-none'>
    //             <button type="button" className="btn btn-golden">查看</button> 
    //         </Link>
    //     </>
    // };
    
    const columns = [ //表格有的資料
        {
            accessorKey:"couch",
            header:"教練",
            size:100,
        },
        {
            accessorKey:"couchGender",
            header:"性別",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"couchPhone",
            header:"電話",
            size:100,
            enableSorting: false
        },
        {
            accessorFn: (row) => `${row.major.join("、")} `,

            id:"major",
            header:"能帶課程",
            size:100,
            Cell: ({ renderedCellValue }) => (<span>{renderedCellValue}</span>)
            
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
        enableColumnFilters={false} //filtering does not work with memoized table body
        
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        // enableSorting={false} //sorting does not work with memoized table body
        enableStickyHeader
        renderTopToolbarCustomActions={() => (
            <Link to="/coachform" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增教練</button> 
            </Link>
        )}
                                
    />
                
  )
}

export default CoachTableDetail