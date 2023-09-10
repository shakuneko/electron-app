import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table';

function StudentsDetailTable({ classes }) {
    const columns = [ //表格有的資料
        {
            accessorKey:"createDate",
            header:"日期",
            size:100,
        },
        {
            accessorKey:"courseType",
            header:"課程種類",
            size:100,
            filterVariant: 'select',
            enableSorting: false
        },
        {
            accessorKey:"coursesAll",
            header:"堂數",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"couch",
            header:"教練",
            size:50,
        },
        {
            accessorKey:"payMethod",
            header:"付款方式",
            size:100,
        },
        {
            accessorKey:"salaryS",
            header:"消費金額",
            size:100,
        },
        {
            accessorKey:"invoiceNum",
            header:"發票號碼",
            size:100,
        },
        {
            accessorKey:"note",
            header:"備註",
            size:100,
            enableSorting: false
        }
    ];

  return (
    <div className="btnbox-item-stu">
        <h3 className='title mt-4'>2023 購買記錄</h3>

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
        />
    </div>
  )
}

export default StudentsDetailTable