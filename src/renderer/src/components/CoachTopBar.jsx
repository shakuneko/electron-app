import { useParams } from 'react-router-dom';

function CoachTopBar({coachValue}) {
    const { id } = useParams();
  //console.log('coachValue:', coachValue[0].couch.name)
    return (
      <div className="coach-top-bar">
        <p className="coach-top-bar-item"> 教練本月薪資：{coachValue[id].salaryS}</p>
      {/* 計算所有學員剩餘的堂數總和 */}
        <p className="coach-top-bar-item"> 學員剩餘總堂數：{coachValue.couch}</p>
    
      </div>
    );
  }
  
export default CoachTopBar;