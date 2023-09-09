import Navbar from '../components/Navbar'
import RevenueSetTable from '../components/RevenueSetTable';
import { columnsRevenue,columnsMoney } from "../components/TableSelectOptions"

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
    return (
        <div className="container-fluid" style={{backgroundColor:"white"}}>
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                <h1 className='title'>營業額</h1>
                    <div>
                        <div>總收入/月</div>
                        <h1 className='money-title mt-2 title'>$ {sum}</h1>
                    </div>
                    <RevenueSetTable classes={classes} columns={columnsRevenue}/>
                    <h1 className='title  mt-4'>核銷</h1>
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
                    <RevenueSetTable classes={classes} columns={columnsMoney}/>
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default Revenue