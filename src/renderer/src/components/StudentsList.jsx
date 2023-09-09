//學員列表box
// import studentValue from "../json/class.json";

function StudentsList() {
  const numbers = [1, 2, 6, 4, 5];
  const listItems = numbers.map((number) => <li className="CoachStudentsListBox-item" key={number}>{number}</li>);

  const names = ["甜甜","Kevin","來福","Jenny","Ken"];
  const nameItems = names.map((name) => <li className="CoachStudentsListBox-item" key={name}>{name}</li>);

  return (
    <div className="CoachStudentsListContainer">
      <p className="CoachStudentsListTitle">學員列表</p>
        <div className="CoachStudentsList">
          <div className="CoachStudentsListBox">
            <p className="CoachStudentsListBox-item">編號</p>
            <ul className="CoachStudentsListBox-item">{listItems}</ul>
          </div>
          <div className="CoachStudentsListBox">
            <p className="CoachStudentsListBox-item">全部</p>
            <ul className="CoachStudentsListBox-item">{nameItems}</ul>
          </div>
        </div>
     

    </div>
  );
}

export default StudentsList;