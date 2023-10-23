import React from "react";
import Navbar from '../components/Navbar'
import StuDataModifyDetail from '../components/StuDataModifyDetail'
import { useParams } from 'react-router-dom';
//components
import GoBackBTN from '../components/GoBackBTN'

function StuDataModify ({ classes }) {
    const { stuID } = useParams();
    const stuDetail =  !!classes && classes.find(item => item.category === "student").stuDetail
    const stuData = stuDetail.find(
        (x) => x.stuID === stuID
    );
    console.log("ID, stuData", stuID, stuData)

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className="title_word">
                        <div className="title_word2"> 
                            <GoBackBTN/>
                            <h1>學員資料修改</h1>
                        </div>
                    </div>
                    <StuDataModifyDetail 
                        stuData={stuData}
                        stuDetail={stuDetail}
                    />
                </div>
            </div>
        </div>       
    )
}

export default StuDataModify