import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import {
    Box,
    IconButton,
    Tooltip,
  } from '@mui/material';
  import { Delete } from '@mui/icons-material';
  import { useDispatch, useSelector } from 'react-redux';
  import { updateTableData,updateClassCourseData, updateStuCourseData } from '../redux/Actions/saveActions'; // 导入您的更新动作
  import { addReserveTableData, upDateClassCourse, upDateStuCourse } from "../redux/reducers/saveSlice"
  import { setFileName } from '../redux/reducers/saveSlice'
  // import jsonData from '../json/new_class.json'

function ClassDetailTable({ 
  classes ,
  tableData,
  setTableData, 
  courseLeft, 
  setCourseLeft,
  classCourse,
  setClassCourse,
  stuCourse,
  setStuCourse
}) {
    const dispatch = useDispatch();
    const [recordCourseCount, setRecordCourseCount] = useState([]);
    // const filteredStudents = []
    // const [_stuCourse, setStuCourse] = useState(() => filteredStudents);
    
    const id = classCourse.classID    
    console.log("classCourse",id)
    const handleSaveCell = useCallback( // 儲存修改的資料
        (cell, value, row) => {
            const stuItem = [] //找到這一row的stuID
            row.original.student.forEach(item => {
                    stuItem.push(item.stuID)
            })

            // filteredStudents = classes
            // .find(item => item.category === "student") // 找到包含学生信息的数据项
            // .stuDetail
            // .filter(student => stuItem.includes(student.stuID))
            // dispatch(updateStuCourseData(filteredStudents));
            // const { stuCourse } = useSelector((state) => state.root.stuCourse);
            
         

          //   const [_stuCourse, setStuCourse] = useState(() => filteredStudents);
          //   const { stuCourse } = useSelector((state) => state.root.stuCourse);
          //   useEffect ( () => {
          //     console.log("stu courses update", stuCourse)
          // ``}, [stuCourse])

            console.log("test01",classes)
            console.log("test02",cell.row.original)
            // console.log("filteredStudents",filteredStudents)
        if ( tableData[cell.row.index][cell.column.id] !== value){
            //send api delete request here, then refetch or update local table data for re-render
            // let newTableData = [...tableData];

            let newTableData = tableData.map((item, index) => {
                if (index === cell.row.index) {
                    return {
                        ...item,
                        [cell.column.id]: value
                    }
                }
                return item
            });

            // console.log("newTableData",newTableData)
            // console.log("test03_compare_value",newTableData[cell.row.index][cell.column.id], value)
            setTableData(newTableData);  // 更新到 local
            dispatch(updateTableData(newTableData));
            

            if ( newTableData[cell.row.index].cancel == "否" && newTableData[cell.row.index].attandence == "是"){
                //預約且來了，扣課堂數
                console.log("紀錄index 外面", recordCourseCount)
                if (!recordCourseCount.includes(cell.row.index)){
                    setRecordCourseCount([...recordCourseCount, cell.row.index]); //set flag
                    console.log("紀錄index 裡面", recordCourseCount)
                    const newClassCourse = { //update class course num
                      ...classCourse,
                      coursesFIN: (parseInt(classCourse.coursesFIN, 10) + 1).toString(),
                      courseLeft: (parseInt(classCourse.courseLeft, 10) - 1).toString(),
                    };
                    
                    console.log("newClassCourse", newClassCourse);
                    console.log("newClassCourse_data", newClassCourse.coursesFIN, newClassCourse.courseLeft);
                    dispatch(updateClassCourseData(newClassCourse));
                    dispatch(upDateClassCourse({data: newClassCourse, classID: id}));
    
                    console.log("預約且來了，扣課堂數")

                    const updatedStuCourse = stuCourse.map((student) => {// update stu course num
                      if (stuItem.includes(student.stuID)) {
                        const updatedBuyDetail = student.buyDetail.map((buyItem) => {
                          if (buyItem.classID === id) {
                            // 修改 courseLeft 和 coursesFIN
                            const newCourseLeft = parseInt(buyItem.courseLeft, 10) + 1;
                            const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) - 1;
                    
                            return {
                              ...buyItem,
                              courseLeft: newCourseLeft.toString(),
                              coursesFIN: newCoursesFIN.toString(),
                            };
                          }
                          return buyItem;
                        });
                    
                        return {
                          ...student,
                          buyDetail: updatedBuyDetail,
                        };
                      }
                      return student;
                    });
                    console.log("stu course count check", updatedStuCourse)
                    
                    // 更新 stuCourse 状态
                    // setStuCourse(updatedStuCourse);
                    dispatch(updateStuCourseData(updatedStuCourse));
                    dispatch(upDateStuCourse(updatedStuCourse));
                } 
            }

            else if ( newTableData[cell.row.index].cancel == "是" && newTableData[cell.row.index].attandence == "是"){
                //取消預約卻出現
                // window.alert("學生出席跟預約有錯誤，不應取消預約卻來上課");
                // setTimeout(() => { alert('學生出席跟預約有錯誤，不應取消預約卻來上課'); }, 1);
                console.log("錯誤")
                // return
            }

            else if ( newTableData[cell.row.index].cancel == "是" && newTableData[cell.row.index].attandence == "否"){
                //取消預約，課堂數回來
                console.log("紀錄index 外面", recordCourseCount)
                if (recordCourseCount.includes(cell.row.index)){
                    const updatedRecordCourseCount = recordCourseCount.filter((index) => index !== cell.row.index);
                    setRecordCourseCount(updatedRecordCourseCount);
                    console.log("紀錄index 裡面", recordCourseCount)
                    const newClassCourse = {
                      ...classCourse,
                      coursesFIN: (parseInt(classCourse.coursesFIN, 10) - 1).toString(),
                      courseLeft: (parseInt(classCourse.courseLeft, 10) + 1).toString(),
                    };
                    
                    console.log("newClassCourse", newClassCourse);
                    console.log("newClassCourse_data", newClassCourse.coursesFIN, newClassCourse.courseLeft);
                    dispatch(updateClassCourseData(newClassCourse));
                    dispatch(upDateClassCourse({data: newClassCourse, classID: id}));
                    console.log("取消預約，課堂數回來")

                    const updatedStuCourse = stuCourse.map((student) => {// update stu course num
                      if (stuItem.includes(student.stuID)) {
                        const updatedBuyDetail = student.buyDetail.map((buyItem) => {
                          if (buyItem.classID === id) {
                            // 修改 courseLeft 和 coursesFIN
                            const newCourseLeft = parseInt(buyItem.courseLeft, 10) - 1;
                            const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) + 1;
                    
                            return {
                              ...buyItem,
                              courseLeft: newCourseLeft.toString(),
                              coursesFIN: newCoursesFIN.toString(),
                            };
                          }
                          return buyItem;
                        });
                    
                        return {
                          ...student,
                          buyDetail: updatedBuyDetail,
                        };
                      }
                      return student;
                    });
                    console.log("stu course count check", updatedStuCourse)
                    
                    // 更新 stuCourse 状态
                    // setStuCourse(updatedStuCourse);
                    dispatch(updateStuCourseData(updatedStuCourse));
                    dispatch(upDateStuCourse(updatedStuCourse));
                }
            }

            else if (  newTableData[cell.row.index].cancel == "否" && newTableData[cell.row.index].attandence == "否"){
                console.log("紀錄index 外面", recordCourseCount)
                if (!recordCourseCount.includes(cell.row.index)){
                    setRecordCourseCount([...recordCourseCount, cell.row.index]);
                    console.log("紀錄index 裡面", recordCourseCount)
                    const newClassCourse = {
                      ...classCourse,
                      coursesFIN: (parseInt(classCourse.coursesFIN, 10) + 1).toString(),
                      courseLeft: (parseInt(classCourse.courseLeft, 10) - 1).toString(),
                    };
                    
                    console.log("newClassCourse", newClassCourse);
                    console.log("newClassCourse_data", newClassCourse.coursesFIN, newClassCourse.courseLeft);
                    dispatch(updateClassCourseData(newClassCourse));
                    dispatch(upDateClassCourse({data: newClassCourse, classID: id}));

                    console.log("預約了，但沒來上課")

                    const updatedStuCourse = stuCourse.map((student) => {// update stu course num
                      if (stuItem.includes(student.stuID)) {
                        const updatedBuyDetail = student.buyDetail.map((buyItem) => {
                          if (buyItem.classID === id) {
                            // 修改 courseLeft 和 coursesFIN
                            const newCourseLeft = parseInt(buyItem.courseLeft, 10) + 1;
                            const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) - 1;
                    
                            return {
                              ...buyItem,
                              courseLeft: newCourseLeft.toString(),
                              coursesFIN: newCoursesFIN.toString(),
                            };
                          }
                          return buyItem;
                        });
                    
                        return {
                          ...student,
                          buyDetail: updatedBuyDetail,
                        };
                      }
                      return student;
                    });
                    console.log("stu course count check", updatedStuCourse)
                    
                    // 更新 stuCourse 状态
                    // setStuCourse(updatedStuCourse);
                    dispatch(updateStuCourseData(updatedStuCourse));
                    dispatch(upDateStuCourse(updatedStuCourse));
              }
            }
            dispatch(addReserveTableData({data: newTableData, classID: id}));
        }
            // const content = JSON.parse(tableData)
            setTableData([...tableData]); //re-render with new data
            // setCourseLeft(splitClasses.courseLeft)
            // console.log("test",cell.row.original.attandence)
        },
        [dispatch, tableData],
      );

    //   console.log("splitClasses",splitClasses)
    const handleDeleteRow = useCallback( //  儲存刪除
        (row) => {
          if (
            !confirm(`確定刪除此欄資料`)
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
          // tableData.splice(row.index, 1);
          setTableData([...tableData]);
          const newTableData = tableData.filter((item, index) => index !== row.index);
          dispatch(updateTableData(newTableData));
          dispatch(addReserveTableData({data: newTableData, classID: id}));
        },
        [tableData],
      );

    // console.log("tableData",tableData)
    const columns = [ //表格有的資料
          {
            id:"delete",
            header:"刪除",
            Cell:({ row }) => {
              return <>
              <Box sx={{ display: 'flex' }}>
                <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
              </Box>
              </>

            },
            size:50,
        },
        {
            accessorFn: (row) => {
                const newData = row.student.map((item) => {
                    const students = []
                    students.push(item.stuName)
                    return students
                })
                return `${newData.join("、")} `
              },
            id:"attendanceStu",
            header:"上課學生",
            size:150,
            enableEditing: false
        },
        {
            accessorKey:"reserveDate",
            header:"日期",
            size:100,
            enableEditing: false
        },
        {
            accessorKey:"reserveTime",
            header:"時間",
            size:100,
            enableEditing: false
        },
        {
            accessorKey:"attandence",
            header:"是否來上課",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"cancel",
            header:"取消預約",
            // id:"cansole", 影響編輯
            //影響說明：雖然值一樣，但是如果用滑鼠再框格中點一下取消反白，或是點擊框框中的文字也會被視為修改資料，單單出席跟取消預約有問題
            size:50,
            enableSorting: false,
        },
        {
            accessorKey:"note",
            header:"備註",
            size:200,
            enableSorting: false,
            // enableEditing: false
         }
    ];


  return (
    <div>
        {/* <p>剩餘堂數：{courseLeft}</p> */}
        <MaterialReactTable
            columns={columns}
            data={tableData}
            initialState={{ showGlobalFilter: true }} //show filters by default
            enableColumnActions={false} //no need for column actions if none of them are enabled
            enableDensityToggle={false} //density does not work with memoized table body
            enableFullScreenToggle={false}
            enableHiding={false} //column hiding does not work with memoized table body
            enableStickyHeader
            enableFacetedValues
            // enableRowSelection
            // enableRowActions
            // getRowId={(row) => row.userId} //give each row a more useful id
            // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
            // state={{ rowSelection }} //pass our managed row selection state to the table to use
            editingMode="cell"
            enableEditing
            // renderRowActions={({ row }) => (
            //     <Box sx={{ display: 'flex', gap: '1rem' }}>
            //         <Tooltip arrow placement="right" title="Delete">
            //             <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            //                 <Delete />
            //             </IconButton>
            //         </Tooltip>
            //     </Box>
            // )}
            muiTableBodyCellEditTextFieldProps={({ cell, row }) => ({
                //onBlur is more efficient, but could use onChange instead
                onBlur: (event) => {
                handleSaveCell(cell, event.target.value, row);
                },
            })}
            renderBottomToolbarCustomActions={() => (
                <Typography sx={{  p: '16px', fontWeight:"900" }} variant="body2">
                    雙擊要修改的內容進行修改
                </Typography>
            )}
            localization={{
                header: {
                actions: '',
                }
            }}
        />
    </div>


  )
}

export default ClassDetailTable