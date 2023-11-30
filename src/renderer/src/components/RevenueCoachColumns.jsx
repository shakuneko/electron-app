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
        accessorFn: (row) => `${row.course} 堂`,
        // accessorKey:"course",
        id:"course",
        header:"堂數",
    },
    {
        accessorFn: (row) => `$ ${row.money}`,
        // accessorKey:"money",
        id:"money",
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
        accessorKey:"courseDate",
        header:"上課日期",
        id:"courseDate",
    },
    {
        accessorKey:"stuName",
        id:"stuName",
        header:"學員",
    },
    {
        accessorFn: (row) => `${row.course} 堂`,
        // accessorKey:"course",
        id:"course",
        header:"堂數",
    },
    {
        accessorFn: (row) => `$ ${row.money}`,
        // accessorKey:"money",
        id:"money",
        header:"金額",
        
    },
    {
        accessorFn: (row) => `$ ${row.courseSalary}`,
        accessorKey:"courseSalary",
        id:"courseSalary",
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
        accessorFn: (row) => `${row.course} 堂`,
        // accessorKey:"course",
        id:"course",
        header:"購買堂數",
    },
    {
        accessorFn: (row) => `${row.finCourse} 堂`,
        // accessorKey:"finCourse",
        id:"finCourse",
        header:"已核銷堂數",
        
    },
    {
        accessorFn: (row) => `${row.leftCourse} 堂`,
        // accessorKey:"leftCourse",
        id:"leftCourse",
        header:"未核銷堂數",       
    }
]