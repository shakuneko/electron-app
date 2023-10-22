import React from "react";
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

function CoachDataModify ({ classes }) {
    const { coachID } = useParams();
    let coachDetail = !!classes && classes[2].coachDetail

    const coachData = coachDetail.find(
        (x) => x.coachID === coachID
    );

    return (
        <div className="container-fluid">
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className="title_word">
                        <div className="title_word2"> 
                            <h1>教練資料修改</h1>
                        </div>
                    </div>
                    <StuDataModifyDetail stuData={stuData}/>
                </div>
                
            </div>
        </div>    
    )
}

export default CoachDataModify