import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Typography, Checkbox } from '@mui/material';
import {
    Box,
    IconButton,
    Tooltip,
  } from '@mui/material';
  import { Delete, Edit } from '@mui/icons-material';
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
  setStuCourse,
}) {
    const dispatch = useDispatch();

    // const flagCourse = []
    const id = classCourse.classID    
    const selectOptins = [
      { value: '-', text: '-' },
      { value: '是', text: '是' },
      { value: '否', text: '否' },
    ];
    // console.log("recordCourseCount",recordCourseCount)
    // console.log("flagCourse",flagCourse)
    const stuItem = [] //找到這一row的stuID
    if (classCourse.student !== undefined)
    for (let i = 0; i < classCourse.student.length; i++) {
        stuItem.push(classCourse.student[i].stuID)
    }
    // console.log("stuItem",stuItem)

    const handleSaveRow = async ({ exitEditingMode, row, values}) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      console.log("tableData[row.index]", [row.index])
      console.log("values", values)

      //send/receive api updates here
      let newTableData = tableData.map((item, index) => {
          if (index === row.index) {
              return {
                ...item,
                ...values,
              }
          }
          return item
      });

      console.log("newTableData",newTableData)
      // console.log("test03_compare_value",newTableData[cell.row.index][cell.column.id], value)
      dispatch(updateTableData(newTableData));
      setTableData(newTableData);  // 更新到 local

    if ( newTableData[row.index].cancel == "否" && newTableData[row.index].attandence == "是"){
          //預約且來了，扣課堂數
          // console.log("紀錄index 外面", recordCourseCount)
          if (!classCourse.courseFlag.includes(row.index)){
              // setRecordCourseCount([...recordCourseCount, row.index]); //set flag
              // console.log("紀錄index 裡面", recordCourseCount)
              // flagCourse.push(row.index)
              // console.log("flagCourse push index", flagCourse)
              const newClassCourse = { //update class course num
                ...classCourse,
                coursesFIN: (parseInt(classCourse.coursesFIN, 10) + 1).toString(),
                courseLeft: (parseInt(classCourse.courseLeft, 10) - 1).toString(),
                courseFlag: [...classCourse.courseFlag, row.index]
              };
              
              console.log("newClassCourse", newClassCourse);
              console.log("newClassCourse data", newClassCourse.coursesFIN, newClassCourse.courseLeft);
              dispatch(updateClassCourseData(newClassCourse));
              dispatch(upDateClassCourse({data: newClassCourse, classID: id}));

              console.log("預約且來了，扣課堂數")

              const updatedStuCourse = stuCourse.map((student) => {// update stu course num
                if (stuItem.includes(student.stuID)) {
                  const updatedBuyDetail = student.buyDetail.map((buyItem) => {
                    if (buyItem.classID === id) {
                      // 修改 courseLeft 和 coursesFIN
                      const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) + 1;
                      const newCourseLeft = parseInt(buyItem.courseLeft, 10) - 1;
                      
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
      else if ( newTableData[row.index].cancel == "是" && newTableData[row.index].attandence == "否"){
          //取消預約，課堂數回來
          // console.log("紀錄index 外面", recordCourseCount)
          if (classCourse.courseFlag.includes(row.index)){
              const newCourseFlag = classCourse.courseFlag.filter((index) => index !== row.index);
              // setRecordCourseCount(updatedRecordCourseCount);
              // console.log("紀錄index 裡面", recordCourseCount)
              const newClassCourse = {
                ...classCourse,
                coursesFIN: (parseInt(classCourse.coursesFIN, 10) - 1).toString(),
                courseLeft: (parseInt(classCourse.courseLeft, 10) + 1).toString(),
                courseFlag: newCourseFlag
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
                      const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) - 1;
                      const newCourseLeft = parseInt(buyItem.courseLeft, 10) + 1;
                      
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

      else if ( newTableData[row.index].cancel == "否" && newTableData[row.index].attandence == "否"){
          // console.log("紀錄index 外面", recordCourseCount)
          if (!classCourse.courseFlag.includes(row.index)){
              // setRecordCourseCount([...recordCourseCount, row.index]);
              // console.log("紀錄index 裡面", recordCourseCount)
              const newClassCourse = {
                ...classCourse,
                coursesFIN: (parseInt(classCourse.coursesFIN, 10) + 1).toString(),
                courseLeft: (parseInt(classCourse.courseLeft, 10) - 1).toString(),
                courseFlag: [...classCourse.courseFlag, row.index]
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
                      const newCoursesFIN = parseInt(buyItem.coursesFIN, 10) + 1;
                      const newCourseLeft = parseInt(buyItem.courseLeft, 10) - 1;
              
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
      setTableData([...tableData]); //re-render with new data
      exitEditingMode(); //required to exit editing mode
    };

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
            enableEditing: false
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
        },
        {
            accessorKey:"attandence",
            header:"是否來上課",
            size:100,
            enableSorting: false,
            editVariant: 'select',
            editSelectOptions:selectOptins,
        },
        {
            accessorKey:"cancel",
            header:"取消預約",
            // id:"cansole", 影響編輯
            //影響說明：雖然值一樣，但是如果用滑鼠再框格中點一下取消反白，或是點擊框框中的文字也會被視為修改資料，單單出席跟取消預約有問題
            size:50,
            enableSorting: false,
            editVariant: 'select',
            editSelectOptions:selectOptins,
            // muiTableBodyCellEditTextFieldProps: {
            //   select: true, //change to select for a dropdown
            //   children: selectOptins.map((state) => (
            //     <MenuItem key={state} value={state}>
            //       {state}
            //     </MenuItem>
            //   )),
            // },
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
            // editingMode="cell"
            enableEditing
            editingMode="row"
            onEditingRowSave={handleSaveRow}
            displayColumnDefOptions={{
              'mrt-row-actions': {
                header: '編輯', //change "Actions" to "Edit"
                size: 50
                //use a text button instead of a icon button
                // Cell: ({ row, table }) => (
                //   <button onClick={() => table.setEditingRow(row)}>Edit Customer</button>
                // ),
              },
            }}
            // muiTableBodyCellEditTextFieldProps={({ cell, row }) => ({
            //     //onBlur is more efficient, but could use onChange instead
            //     onBlur: (event) => {
            //     handleSaveCell(cell, event.target.value, row);
            //     },
            // })}
            muiSearchTextFieldProps={{
              placeholder: "請輸入想查詢的學生及時間",
              sx: { minWidth: '300px' },
            }}
            // renderBottomToolbarCustomActions={() => (
            //     <Typography sx={{  p: '16px', fontWeight:"900" }} variant="body2">
            //         雙擊要修改的內容進行修改
            //     </Typography>
            // )}
        />
    </div>


  )
}

export default ClassDetailTable