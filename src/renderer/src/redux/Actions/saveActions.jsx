export const checkPageHash = (currentHash) => ({
    type: 'CHECK_PAGE_HASH',
    payload: currentHash,
  });

export const updateTableData = (newTableData) => ({
  type: 'UPDATE_TABLE_DATA',
  payload: newTableData,
});

export const updateClassCourseData = (updateClassCourse) => ({
  type: 'UPDATE_CLASSS_COURSE_DATA',
  payload: updateClassCourse,
});

export const updateStuCourseData = (updateStuCourse) => ({
  type: 'UPDATE_STU_COURSE_DATA',
  payload: updateStuCourse,
});