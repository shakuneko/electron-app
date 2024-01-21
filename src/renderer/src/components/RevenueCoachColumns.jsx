export const columnsTotal = [
    {
        accessorKey:"buyDate",
        header:"購買日期",
        id:"buyDate",
    },
    {
        accessorKey:"stuName",
        id:"stuName",
        header:"學員",
    },
    {
        accessorFn: (row) => `${row.courseAll} 堂`,
        // accessorKey:"course",
        id:"courseAll",
        header:"堂數",
    },
    {
        accessorFn: (row) => `$ ${row.coursePrice}`,
        // accessorKey:"money",
        id:"coursePrice",
        header:"金額",
        
    },
    {
        accessorKey:"invoiceNum",
        id:"invoiceNum",
        header:"發票號碼",       
    }
]

export const columnsFin = [
    {
        accessorKey:"reserveDate",
        header:"上課日期",
        id:"reserveDate",
    },
    {
        accessorKey:"studentName",
        id:"studentName",
        header:"學員",
    },
    {
        accessorFn: (row) => `${row.courseFin} 堂`,
        // accessorKey:"course",
        id:"courseFin",
        header:"堂數",
    },
    {
        accessorFn: (row) => `$ ${row.hasDonePrice}`,
        // accessorKey:"money",
        id:"hasDonePrice",
        header:"金額",
        
    },
    {
        accessorFn: (row) => `$ ${row.salaryPerClass}`,
        accessorKey:"salaryPerClass",
        id:"salaryPerClass",
        header:"堂薪",       
    }
]

export const columnsLeft = [
    {
        accessorKey:"buyDate",
        header:"購買日期",
        id:"buyDate",
    },
    {
        accessorKey:"stuName",
        id:"stuName",
        header:"學員",
    },
    {
        accessorFn: (row) => `${row.courseAll} 堂`,
        // accessorKey:"course",
        id:"courseAll",
        header:"購買堂數",
    },
    {
        accessorFn: (row) => `${row.courseFin} 堂`,
        // accessorKey:"finCourse",
        id:"courseFin",
        header:"已核銷堂數",
        
    },
    {
        accessorFn: (row) => `${row.courseLeft} 堂`,
        // accessorKey:"leftCourse",
        id:"courseLeft",
        header:"未核銷堂數",       
    }
]