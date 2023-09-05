import  {  selectFilter  } from 'react-bootstrap-table2-filter';
import TableDetail from './TableDetail';

import { Link } from 'react-router-dom';

function TableColumn({ classes }) {

    const CheckOut = (data, row) => { //設定查看按鈕要進入的頁面
        return<>
           <Link to="/form" className='table-link-underline-none'>
                {/* 後面改用Link */}
                <button type="button" className="btn btn-golden">查看{data}</button> 
                {/* 測試按鈕點擊 */}
            </Link>
        </>
    };
    const AddBGC = (data) => { // 設定邊框
        let e;

        if (data == '快要截止') e = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{data}</span>
        else if (data == '已截止') e = <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>{data}</span>
        else e = <div>{data}</div>
        
        return e
    }

    const ClassAddBGC = (data, cell) => { // 設定邊框   
        let lecture = []     
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                lecture = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{data[i]}</span>
            }
           else {
            let e = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{data[i]}</span>
            lecture = e
           }
           
            // lecture.push(<span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{data[i]}</span>)
        }
        
        return <div className='setLecture'>
            
        </div>
    }

    const selectOptions = { //下拉選單篩選
        'PT': 'PT',
        '皮拉提斯': '皮拉提斯',
        '團課': '團課',
        '場地租借': '場地租借'
    };
    const columnClass = [ //表格有的資料
        {
            dataField:"couch",
            text:"教練",
        },
        {
            dataField:"courseType",
            text:"課程種類",
            // formatter: cell => cell,
            formatter: cell => selectOptions[cell], //能自由加入東西
            filter: selectFilter({
                options: selectOptions,
                placeholder:'課程種類篩選',
                className:'form-select'
            })
        },
        {
            dataField:"student",
            text:"學員"
        },
        {
            dataField:"courseLeft",
            text:"剩餘堂數",
            sort:true, //降冪 & 升冪
            classes: (cell, row, rowIndex, colIndex) => { //設定判斷樣式
            if (cell === '0') return 'alert-mode';
            }
        },
        {
            dataField:"coursesAll",
            text:"總堂數",
        },
        {
            dataField:"exCourse",
            text:"體驗課",
            classes: (cell, row, rowIndex, colIndex) => { 
                if (cell === 'Yes') return 'alert-mode';
            }
        },
        {
            dataField:"status",
            text:"狀態",
            formatter:AddBGC
        },
        {
            dataField:"id",
            text:"操作",
            formatter:CheckOut
        }
    ];

    const columnStudent = [
        {
            dataField:"student",
            text:"學員"
        },
        {
            dataField:"stuGender",
            text:"性別"
        },
        {
            dataField:"stuPhone",
            text:"電話"
        },
        {
            dataField:"createDate",
            text:"建檔日期",
            sort:true,
        },
        {
            dataField:"note",
            text:"備註"
        },
        {
            dataField:"id",
            text:"操作",
            formatter:CheckOut
        }
    ]

    const columnCouch = [
        {
            dataField:"couch",
            text:"教練"
        },
        {
            dataField:"couchGender",
            text:"性別"
        },
        {
            dataField:"couchPhone",
            text:"電話"
        },
        {
            dataField:"major",
            text:"能帶課程",
            formatter:ClassAddBGC
        },
        {
            dataField:"note",
            text:"備註"
        },
        {
            dataField:"id",
            text:"操作",
            formatter:CheckOut
        }
    ]

    return <TableDetail classes={classes} columns={columnCouch}/>
  }
  
  export default TableColumn