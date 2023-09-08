import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { size } from "@floating-ui/core";

function Table({classes}) {
    const CheckOut = ({cell}) => { //設定查看按鈕要進入的頁面
        return<>
           <Link to="/" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">查看</button> 
            </Link>
        </>
    };
    const AddBGC = ({cell}) => { // 設定邊框
        let e;

        if (cell.getValue()  == '快要截止') e = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{cell.getValue()}</span>
        else if (cell.getValue()  == '已截止') e = <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>{cell.getValue()}</span>
        else e = <div>-</div>
        
        return e
    }
    const AddAlertMode = ({renderedCellValue}) => {
        if (renderedCellValue === '1') return <span className="alert-mode">{renderedCellValue}</span>;
        else return<>{renderedCellValue}</>
    }
    const selectOptions = [ //下拉選單篩選
        { text: 'PT', value: 'PT' },
        { text: '皮拉提斯', value: '皮拉提斯' },
        { text: '團課', value: '團課' },
        { text: '場地租借', value: '場地租借' },
        { text: 'P運動舒緩T', value: '運動舒緩' }
];
    const columns = [ //表格有的資料
        {
            accessorKey:"couch",
            header:"教練",
            size:100,
            columnFilterModeOptions: ['A', 'contains', 'startsWith'],
        },
        {
            accessorKey:"courseType",
            header:"課程種類",
            size:100,
            filterFn: 'equals',
            filterSelectOptions: selectOptions,
            filterVariant: 'select',
            muiTableHeadCellFilterTextFieldProps: { placeholder: '課程種類' },
        },
        {
            accessorKey:"student",
            header:"學員",
            size:100
        },
        {
            accessorKey:"courseLeft",
            header:"剩餘堂數",
            size:100,
            Cell: AddAlertMode
        },
        {
            accessorKey:"coursesAll",
            header:"總堂數",
            size:100,
            Cell: AddAlertMode
        },
        {
            accessorKey:"exCourse",
            header:"體驗課",
            size:100,
            Cell: ({ renderedCellValue }) => {
                if (renderedCellValue === '是') return <span className="alert-mode">{renderedCellValue}</span>;
                else return<>{renderedCellValue}</>
            },
        },
        {
            accessorKey:"status",
            header:"狀態",
            size:100,
            Cell: AddBGC
        },
        {
            accessorKey:"id",
            header:"操作",
            size:100,
            Cell: CheckOut
        }
    ];
    
  return (
    <div className="container-fluid" style={{backgroundColor:"white"}}>
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>課程管理</h1>
                    <MaterialReactTable 
                        columns={columns}
                        data={classes} 
                        initialState={{ showColumnFilters: true }} //show filters by default
                        enableColumnActions={false} //no need for column actions if none of them are enabled
                        // enableColumnFilters={false} //filtering does not work with memoized table body
                        
                        enableDensityToggle={false} //density does not work with memoized table body
                        enableFullScreenToggle={false}
                        enableHiding={false} //column hiding does not work with memoized table body
                        // enableSorting={false} //sorting does not work with memoized table body
                        enableStickyHeader
                        renderTopToolbarCustomActions={() => (
                            <Link to="/" className='table-link-underline-none'>
                                <button type="button" className="btn btn-golden">新增課程</button> 
                            </Link>
                        )}
                        muiTableHeadCellFilterTextFieldProps={{
                            sx: { m: '0.3rem 0', width: '100%' },
                            variant: 'outlined',
                          }}
                        
                    />
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Table