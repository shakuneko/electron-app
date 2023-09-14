import { useParams } from 'react-router-dom';

function CoachTopBar({coachValue}) {
    const { id } = useParams();
    let totalStudentCourseLeft = 6
  //console.log('courseleft:', coachValue[id].student.courseLeft)


    return (
      <div className="coach-top-bar">
        <p className="coach-top-bar-item"> 教練本月薪資：{coachValue[id].coach.salary}</p>
      {/* 計算所有學員剩餘的堂數總和 */}
        <p className="coach-top-bar-item"> 學員剩餘總堂數：{totalStudentCourseLeft}</p>
    
      </div>
    );
  }
  
export default CoachTopBar;