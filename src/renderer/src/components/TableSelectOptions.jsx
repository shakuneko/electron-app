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

export const getStatusText = (dateString) => {
    const currentDate = new Date(); // 当前日期
    const inputDate = new Date(dateString); // 输入的日期
    const fivMonthLater = new Date(inputDate);
    fivMonthLater.setMonth(fivMonthLater.getMonth() + 5); // 当前日期减去1个月
    const sixMonthsLater = new Date(inputDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6); // 当前日期减去6个月
  
    console.log("oneMonthAgo", fivMonthLater);
    console.log("sixMonthsAgo", sixMonthsLater);
    console.log("inputDate", inputDate);
  
    if (currentDate > fivMonthLater && currentDate < sixMonthsLater) {
      return <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>快要截止</span>;
    } else if (currentDate > sixMonthsLater) {
      return <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>已截止</span>;
    } else {
      return <span>-</span>;
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
        accessorKey:"classType",
        header:"項目名稱"
    },
    {
        accessorKey:"classLeftLast",
        header:"上月未核銷堂數",
    },
    {
        // accessorFn: (row) => `${row.salary*row.preCourseLeft} `,
        accessorKey:"totalLeftSalaryLast",
        id:"lastMonthMoney",
        // accessorKey:"preCourseLeft",
        header:"上月未核銷金額",
        // Cell:CountMoney
    },
    {
        accessorKey:"classLeft",
        header:"本月未核銷堂數",
        
    },
    {
        // accessorFn: (row) => `${row.salary*row.courseLeft} `,
        accessorKey:"totalLeftSalary",
        id:"thisMonthMoney",
        // accessorKey:"courseLeft",
        header:"本月未核銷金額",       
        // Cell:CountMoney
    }
]

export const columnsMoney = [
    {
        accessorKey:"coachName",
        header:"教練名稱",
        size:100
    },
    {
        accessorKey:"coursesFIN",
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