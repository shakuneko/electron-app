import { Link } from 'react-router-dom';


export const CheckOut = ( pageData, data) => { //設定查看按鈕要進入的頁面
    const linkTo = `/${pageData}/${data}`;
    return<>
       <Link to={linkTo} className='table-link-underline-none'>
            <button type="button" className="btn btn-golden">查看</button> 
        </Link>
    </>
};

export const splitData = ( element ) => {
    return element.join("、")
}

const CountMoney = ( {row, renderedCellValue} ) => {
    return <>{ row.original.salary * renderedCellValue}</>
}

export const getStuAge = (stuBuyDetailData) => {
    const birthDateString = stuBuyDetailData;
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
        age--; // 生日还未到，减去一年
    }
    console.log("age",age)
    return age
}

export const getStatusText = (dateString) => {
    const currentDate = new Date(); // 当前日期
    const inputDate = new Date(dateString); // 输入的日期
    const fivMonthLater = new Date(inputDate);
    fivMonthLater.setMonth(fivMonthLater.getMonth() + 5); // 当前日期减去1个月
    const sixMonthsLater = new Date(inputDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6); // 当前日期减去6个月
  
    // console.log("fivMonthLater", fivMonthLater);
    // console.log("sixMonthsAgo", sixMonthsLater);
    // console.log("inputDate", inputDate);
  
    // if (currentDate > fivMonthLater && currentDate < sixMonthsLater) {
    //   return <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>快要截止</span>;
    // } else if (currentDate > sixMonthsLater) {
    //   return <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>已截止</span>;
    // } else {
    //   return <span>-</span>;
    // }
    if (currentDate > fivMonthLater && currentDate < sixMonthsLater) {
        return "快要截止";
      } else if (currentDate > sixMonthsLater) {
        return "已截止";
      } else {
        return "-";
      }
}

export const selectOptions = [ //下拉選單篩選
{ text: 'PT', value: 'PT' },
{ text: '皮拉提斯', value: '皮拉提斯' },
{ text: '團課', value: '團課' },
{ text: '場地租借', value: '場地租借' },
{ text: '運動舒緩', value: '運動舒緩' }
];

export const columnsRevenue = [
    {
        accessorKey:"courseType",
        header:"項目名稱",
        id:"courseType",
        Cell: ({renderedCellValue})=> {
            console.log(renderedCellValue)
            return <Link to={`/revenue/courseType/${renderedCellValue}`} className='table-link-underline-none revenue-link'>{renderedCellValue} </Link>
        }
    },
    {
        accessorFn: (row) => `$ ${row.preLeftMoney} / ${row.preLeftCourse}堂`,
        id:"preMonthLeft",
        header:"Ｘ月未核銷 (金額 / 堂)",
    },
    {
        accessorFn: (row) => `$ ${row.totalMoney} / ${row.totalCourse}堂`,
        id:"thisMonthTotal",
        header:"Ｘ月簽約  (金額 / 堂)",
    },
    {
        accessorFn: (row) => `$ ${row.finMoney} / ${row.finCourse}堂`,
        id:"thisMonthFin",
        header:"Ｘ月已核銷 (金額 / 堂)",
        
    },
    {
        accessorFn: (row) => `$ ${row.leftMoney} / ${row.leftCourse}堂`,
        id:"thisMonthLeft",
        header:"Ｘ月未核銷 (金額 / 堂)",       
    }
]

export const columnsMoney = [
    {
        accessorKey:"coachName",
        header:"教練名稱",
        size:100
    },
    {
        accessorKey:"attandenceCount",
        header:"已核銷堂數",
        size:100
    },
    {
        accessorKey:"courseLeft",
        header:"未核銷堂數",
        size:100
    },
    {
        accessorFn: (row) => `${row.major.join("、")} `,

        id:"major",
        header:"課程種類",
        Cell: ({ renderedCellValue }) => (<span>{renderedCellValue}</span>),
        size:150,
        
    },
    {
        accessorKey:"exCourseCount",
        header:"體驗課堂數",
        size:100
    }
]