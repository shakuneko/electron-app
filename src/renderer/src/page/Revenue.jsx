import Navbar from '../components/Navbar'
import { columnsMoney, columnsRevenue} from '../components/RevenuwTableColums'
import SetTable from "../components/SetTable"

function Revenue({ classes }) {
    //計算營業額
    let sum = 0
    let finCoures = 0
    
    for (let i = 0; i < classes.length; i++) {
        if (i == 0) {
            sum = classes[i].salary * classes[i].coursesAll
            finCoures = classes[i].coursesFIN * 1
        }
        else {
            sum += classes[i].salary * classes[i].coursesAll
            finCoures += classes[i].coursesFIN * 1 
            // sum +=  each
            // finCoures += course
        }
        console.log(finCoures)
    }
    const revenue = sum

    //計算核銷
    // const array1 = classes.coursesAll;

    // const initialValue = 0;
    // const sumWithInitial = array1.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

    const myNums = [1,2,3,4,5];

    // create a variable for the sum and initialize it
    let l = 0;
    
    // calculate sum using forEach() method
    myNums.forEach( num => {
      l += num;
    })

    
    // let totalCourse //總購買堂數
    // let totalGain //已核銷金額
    // for (let i = 0; i < classes.length; i++) {
    //     if (i == 0) {
    //         sum = classes[i].salary * classes[i].coursesAll
    //     }
    //     else {
    //         let each = classes[i].salary * classes[i].coursesAll
    //         sum +=  each
    //     }
    // }

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
                    <SetTable classes={classes} columns={columnsRevenue}/>
                    <h1 className='title'>核銷</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <div>已核銷</div>
                            <h1 className='money-title mt-2 title'>$ 2,000,000 / {finCoures}堂</h1>
                        </div>
                        <div className='col-6'>
                            <div>未核銷</div>
                            <h1 className='money-title mt-2 title'>$</h1>
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