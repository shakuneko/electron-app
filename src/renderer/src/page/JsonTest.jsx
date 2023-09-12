import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
function JsonTest(props) {
  const coachForm = useSelector((state) => state.coach.coachForm);
  // const { coachForm } = props;
  // console.log(props);
  console.log(coachForm);
  return (
    <div>
      {/* 使用从 Redux Store 中提取的 JSON 数据来渲染 */}
      <pre>{JSON.stringify(coachForm, null, 2)}</pre>
    </div>
  );
}

const mapStateToProps = (state) => ({
  coachForm: state.coachForm,
});
export default JsonTest;