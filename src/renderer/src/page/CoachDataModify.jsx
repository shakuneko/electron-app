import React from "react";
import Navbar from '../components/Navbar'
import CoachDataModifyDetail from '../components/CoachDataModifyDetail'
import { useParams } from 'react-router-dom';

function CoachDataModify ({ classes }) {
    const { coachID } = useParams();
    let coachDetail = !!classes && classes.find(item => item.category === "coach").coachDetail

    const coachData = coachDetail.find(
        (x) => x.coachID === coachID
    );
    console.log("page coachData", coachData)

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
                    <CoachDataModifyDetail 
                        coachData={coachData}
                        coachDetail={coachDetail}
                    />
                </div>
                
            </div>
        </div>    
    )
}

export default CoachDataModify