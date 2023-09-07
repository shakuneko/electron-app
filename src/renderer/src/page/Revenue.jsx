import Navbar from '../components/Navbar'
import { columnsMoney, columnsRevenue} from '../components/RevenuwTableColums'
import SetTable from "../components/SetTable"

function Revenue({ classes }) {
    //計算營業額
    let sum = 0
    let finCourse = 0
    let finMoney = 0
    let leftCourse = 0
    let leftMoney = 0
    for (let i = 0; i < classes.length; i++) {
        if (i == 0) {
            sum = classes[i].salary * classes[i].coursesAll
            finCourse = classes[i].coursesFIN * 1
            finMoney = classes[i].salary * classes[i].coursesFIN

            leftCourse = classes[i].courseLeft * 1
            leftMoney = classes[i].courseLeft *classes[i].salary
        }
        else {
            sum += classes[i].salary * classes[i].coursesAll
            finCourse += classes[i].coursesFIN * 1 
            finMoney += classes[i].salary * classes[i].coursesFIN

            leftCourse += classes[i].courseLeft * 1
            leftMoney += classes[i].courseLeft *classes[i].salary
            // sum +=  each
            // finCoures += course
        }
    }

    const products = [
        {
            "courseType":"PT",
            "courseLeft":"15",
            "preCourseLeft":"16",
            "salary":"650",
        },
        {
            "courseType":"皮拉提斯",
            "courseLeft":"6",
            "preCourseLeft":"6",
            "salary":"650",
        },
        {
            "courseType":"團課",
            "courseLeft":"7",
            "preCourseLeft":"7",
            "salary":"650",
        },
        {
            "courseType":"場地租借",
            "courseLeft":"3",
            "preCourseLeft":"6",
            "salary":"650",
        },
        {
            "courseType":"運動舒緩",
            "courseLeft":"0",
            "preCourseLeft":"0",
            "salary":"650",
        },
    ]

    return (
        <div className='row row-no-gutter margin-left-right container-fluid'>
            <div className='nav col-2'>
                <Navbar/>
            </div>
            <div className='col-10 container margin-left-right'>                    
                <div className='mt-4 table-container'>
                    <h1 className='title'>營業額</h1>
                    <div>
                        <div>總收入/月</div>
                        <h1 className='money-title mt-2 title'>$ {sum}</h1>
                    </div>
                    {/* <RevenuwTableColums classes={classes} /> */}
                    <SetTable classes={products} columns={columnsRevenue}/>
                    <h1 className='title'>核銷</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <div>已核銷</div>
                            <h1 className='money-title mt-2 title'>$ {finMoney} / {finCourse}堂</h1>
                        </div>
                        <div className='col-6'>
                            <div>未核銷</div>
                            <h1 className='money-title mt-2 title'>$ {leftMoney} / {leftCourse}堂</h1>
                        </div>
                    </div>
                    {/* <RevenuwTableColums classes={classes} /> */}
                    <SetTable classes={classes} columns={columnsMoney}/>
                </div>
            </div>
        </div>
    )
  }
  
  export default Revenue