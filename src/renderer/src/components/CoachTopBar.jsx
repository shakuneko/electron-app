function CoachTopBar({coachValue}) {
  //console.log('coachValue:', coachValue[0].couch.name)
    return (
      <div className="coach-top-bar">
        <p className="coach-top-bar-item"> 教練本月薪資：{coachValue.couch}</p>
      
        <p className="coach-top-bar-item"> 學員剩餘總堂數：{coachValue.couch}</p>
    
      </div>
    );
  }
  
export default CoachTopBar;