function DoneClasses({ stuData}) {
  // 用于存储符合条件的 finCourse 对象的数组
  let finCourses = [];

  if (stuData)
  stuData.buyDetail.forEach((buyDetail) => {
    // 检查 coursesFIN 是否等于 coursesAll
    if (buyDetail.coursesFIN === buyDetail.coursesAll) {
      let finCourse = {
        coursesAll: buyDetail.coursesAll,
        courseType: buyDetail.courseType,
        coachName: buyDetail.coachName, // 默认为空
      };
      if (buyDetail.exCourse == '是') {
        finCourse.courseType = finCourse.courseType + " " + "體驗課"
      }
      if (buyDetail.courseType == "團課" || buyDetail.courseType == "課程租借"){
        finCourse.coachName = "不指定/無"
      }
      finCourses.push(finCourse);
      console.log("finCourse", finCourse)
    }
  });


    console.log("finCourse push" , finCourses)
  return (
    <div className="doneclass">
      <h3>已完成課程</h3>
      {finCourses.map((finCourse, index) => (
        <button
          key={index}
          className="doneclasscard btn btn-golden"
        >
          {/* <p className="coach-top-bar-item">{finCourse.coursesAll}</p> */}
          <p className="coach-top-bar-item">{finCourse.courseType}</p>
          <p className="coach-top-bar-item">{finCourse.coachName}</p>
        </button>
      ))}
    </div>
  );
}

export default DoneClasses;
