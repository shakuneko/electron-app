import  {  selectFilter  } from 'react-bootstrap-table2-filter';
import classes from "../json/class.json"
// import SetTable from './SetTable';
// import { columns  } from './TableColumn';

// import { Link } from 'react-router-dom';

// function RevenueTableColumn({ classes }) {

const CountMoney = (data, row, rowIndex) => {
    let sum = 0
    sum = data * classes[rowIndex].salary
    return {data} = sum
}

const LeftCoures = (data, rowIndex) => {
    let left = 0
    left = classes[rowIndex].coursesAll - classes[rowIndex].courseLeft
}

const ClassAddBGC = (data, cell) => { // 設定邊框   
    cell => selectOptions[cell]
    let text     
    for (let i = 0; i < data.length; i++) {
        if (i == 0) {
            text = data[i]
        }
       else {
            text = text + "、" + data[i]
       }
    }
    return text
}

const selectOptions = { //下拉選單篩選
    'PT': 'PT',
    '皮拉提斯': '皮拉提斯',
    '團課': '團課',
    '場地租借': '場地租借'
};

export const columnsRevenue = [
    {
        dataField:"courseType",
        text:"項目名稱"
    },
    {
        dataField:"preCourseLeft",
        text:"上月未核銷堂數",
    },
    {
        dataField:"preCourseLeft",
        text:"上月未核銷金額",
        formatter:CountMoney
    },
    {
        dataField:"courseLeft",
        text:"本月未核銷堂數",
        
    },
    {
        dataField:"courseLeft",
        text:"本月未核銷金額",
        formatter:CountMoney
    }
]

export const columnsMoney = [
    {
        dataField:"couch",
        text:"教練名稱"
    },
    {
        dataField:"coursesFIN",
        text:"已核銷堂數",
    },
    {
        dataField:"courseLeft",
        text:"未核銷堂數",
        // formatter:CountMoney(preCourseLeft,classes.salary)
    },
    {
        dataField:"major",
        text:"課程種類",
        formatter:ClassAddBGC        
    },
    {
        dataField:"coursesAll",
        text:"體驗課堂數"
    }
]