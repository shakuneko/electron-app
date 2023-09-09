//學員列表box
// import studentValue from "../json/class.json";

function StudentsList() {
  const numbers = [1, 2, 6, 4, 5];
  const listItems = numbers.map((number) => <li className="CoachStudentsListBox-item" key={number}>{number}</li>);

  return (
    <div className="CoachStudentsListContainer">
      <p className="CoachStudentsListTitle">學員列表</p>
        <div className="CoachStudentsList">
          <div className="CoachStudentsListBox">
            <p className="CoachStudentsListBox-item">編號</p>
            <ul>{listItems}</ul>
          </div>
          <div className="CoachStudentsListBox">
            <p className="CoachStudentsListBox-item">全部</p>
            <ul>{listItems}</ul>
          </div>
        </div>
     

    </div>
  );
}

export default StudentsList;