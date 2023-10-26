import React, { useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link ,useParams} from 'react-router-dom';
import { getStatusText } from './TableSelectOptions'
import { useDispatch, useSelector } from 'react-redux';
import { selectFileName, updateClassStatus, upDateStuCourse } from '../redux/reducers/saveSlice'

//confirm
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ClassTableDetail({classDetail, classes}) {
    const dispatch = useDispatch();
    const [newClassStatus, setNewClassStatus] = useState([]);

    const fileNameData = useSelector(selectFileName);
    const hasStudentData = fileNameData.newJsonData[1].stuDetail.length > 0;
    const hasCoachData = fileNameData.newJsonData[2].coachDetail.length > 0;
    
   // 判断是否两个类别都为空
   const bothCategoriesEmpty = !hasCoachData && !hasStudentData;

  useEffect(() => {
    const updatedClassStatus = classDetail.map((item, index) => {
      const nowStatus = getStatusText(item.buyDate);
      if (item.status !== nowStatus && item.courseType !="場地租借") {
        return {
          ...item,
          status: nowStatus,
        };
      }
      else if (item.courseType =="場地租借"){
          return {
            ...item,
            status: "無期限",
          };
        }
      return item;
    });
    dispatch(updateClassStatus(updatedClassStatus));
    const classIDToNum = classDetail.map((item, index) => {
      if (typeof item.classID === "string") {
        return {
          ...item,
          classID: parseInt(item.classID, 10),
        };
      }
      return item;
    });
    console.log("newClassStatus", updatedClassStatus, " classIDToNum", classIDToNum);
    setNewClassStatus(classIDToNum);
  }, []);

  console.log("newClassStatus", newClassStatus);
  const [open, setOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleClickOpen = (row) => {
    setRowToDelete(row); // 保存要删除的行数据
    setOpen(true);
  };
  
  const handleClose = () => {
    setRowToDelete(null); // 关闭对话框时重置要删除的行数据
    setOpen(false);
  };

  const handleDeleteConfirmed = () => {
    if (rowToDelete) {
      // 执行删除操作
      handleDeleteRow(rowToDelete);

      // 清除要删除的行数据和关闭对话框
      setRowToDelete(null);
      setOpen(false);
    }
  };



  const handleDeleteRow = useCallback( //  儲存刪除
    (row) => {
      // setTableData([...classDetail]);
      //update classDetail
      const newTableData = classDetail.filter((item, index) => index !== row.index);
      console.log("newTableData data", newTableData);

      //update student buyDetail
      const studentIDs = [];
      let stuDetailData = classes.find(item => item.category === "student");
      if (stuDetailData) {
        stuDetailData.stuDetail.forEach(student => {
          student.buyDetail.map(buy => {
            
            if (buy.classID == (row.original.classID)) {
              console.log("row.original.classID", row.original.classID, buy.classID)
              studentIDs.push(student.stuID);
            }
            
          });
        });
      }
      console.log("updatedStuBuydetail data",  stuDetailData, row.index, studentIDs);
      const updatedStuBuydetail = stuDetailData.stuDetail.map((student) => {// update stu course num
        if (studentIDs.includes(student.stuID)) {
          // console.log("row.original.classID", row.original.classID, row.original.classID.toString())
          const classIDString = row.original.classID.toString();
          const updatedBuyDetail = student.buyDetail.filter(buy => buy.classID !== classIDString);
          console.log("updatedBuyDetail", updatedBuyDetail)
          return {
            ...student,
            buyDetail: updatedBuyDetail,
          };
        }
        return student;
      });
      // console.log("stu course count check", updatedStuCourse)
      console.log("updatedStuBuydetail data",  updatedStuBuydetail);
      dispatch(upDateStuCourse(updatedStuBuydetail));
      dispatch(updateClassStatus(newTableData));

      const classIDToNum = newTableData.map((item) => {
        if (typeof item.classID === "string") {
          return {
            ...item,
            classID: parseInt(item.classID, 10),
          };
        }
        return item;
      });
      console.log(" classIDToNum data", classIDToNum);
      setNewClassStatus(classIDToNum);
    },
    [newClassStatus],
  );

  const AddBGC = ({cell}) => { // 設定邊框
    let e;

    if (cell.getValue()  == '快要截止') e = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{cell.getValue()}</span>
    else if (cell.getValue()  == '已截止') e = <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>{cell.getValue()}</span>
    else if (cell.row.original.courseType == '場地租借') e = <span>無期限</span>
    else e = <div>-</div>
    return e
  }
  
  const CheckOut = ({renderedCellValue, row}) => { //設定查看按鈕要進入的頁面
    // console.log(row,"row")
    return<>
      <div style={{display:"flex", flexDirection:"row"}}>
        <Link to={`/classes/id/${renderedCellValue}`} className='table-link-underline-none'>
            <button type="button" className="btn btn-golden">查看</button> 
        </Link>
        <button type="button" className="btn btn-danger" onClick={() => handleClickOpen(row)}>              
          刪除
        </button> 

      </div>
    </>
  };
  
  const AddAlertMode = ({renderedCellValue}) => {
    if (renderedCellValue === '1') return <span className="alert-mode">{renderedCellValue}</span>;
    else return<>{renderedCellValue}</>
  }

  
  // const inputDateString = "2023-8-30"; // 你的输入日期
  // const result = getStatusText(inputDateString);
  // console.log(result);

  const columns = [ //表格有的資料
    {
        accessorKey:"classID",
        header:"#",
        Cell:({row}) => {
          // console.log("row data", row.index)
          return row.index+1
        },
        size:50,
    },
    {
        accessorFn: (row) => {
            // !!row.coach && 
            const newData = row.coach.map((item) => {
                const coachs = []
                coachs.push(item.coachName)
                return coachs
            })
            return `${newData.join("、")} `
          },
        header:"教練",
        filterVariant: 'select',
        size:100,
    },
    {
        accessorKey:"courseType",
        header:"課程種類",
        size:100,
        filterVariant: 'select',
        enableSorting: false
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
        header:"學員",
        size:100,
        enableSorting: false,
        filterVariant: 'select',
    },
    {
        accessorKey:"courseLeft",
        header:"剩餘堂數",
        size:100,
        Cell: AddAlertMode
    },
    {
        accessorKey:"coursesAll",
        header:"總堂數",
        size:100,
        Cell: AddAlertMode
    },
    // {
    //     accessorKey:"exCourse",
    //     header:"體驗課",
    //     size:50,
    //     Cell: ({ renderedCellValue }) => {
    //         if (renderedCellValue === '是') return <span className="alert-mode">{renderedCellValue}</span>;
    //         else return<>{renderedCellValue}</>
            
    //     },
      
    // },
    {
        accessorKey:"status",
        header:"狀態",
        size:100,
        Cell: AddBGC,
        filterVariant: 'select',
    },
    {
        accessorKey:"classID",
        id:"checkout_id",
        header:"操作",
        size:100,
        Cell: CheckOut,
        enableSorting: false
    }
  ];
    
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight:900}}>確認刪除？</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定要刪除這項資料嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom:"8px" }}>
          <button onClick={handleClose} className='btn btn-outline-dbrown'>
            取消
          </button>
          <button onClick={handleDeleteConfirmed} className='btn btn-golden'>
            確認
          </button>
        </DialogActions>
      </Dialog>

      <MaterialReactTable 
        columns={columns}
        data={newClassStatus} 
        initialState={{ 
          showGlobalFilter: true ,
          sorting: [
            { id: 'classID', 
              desc: true,
          }, //sort by classID in descending order by default
          ],
        }} //show filters by default
      
        enableColumnActions={false} //no need for column actions if none of them are enable
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        enableFacetedValues
        muiSearchTextFieldProps={{
            placeholder: "搜尋想查找的名稱、堂數",
            sx: { minWidth: '300px' },
          }}
        renderTopToolbarCustomActions={({table}) => (
            <div>
            {hasCoachData && hasStudentData ? (
              <Link to="/classes/form" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增課程</button> 
              </Link>
            ) : (
              <div className="addclass">
                <button type="button" className="btn btn-golden" disabled>
                  新增課程
                </button>
                <div className="addclassnote">（無法新增課程，請先輸入教練及學員資料）</div>
              </div>
            )}
            {/* <button onClick={()=> console.log(table.getRowModel().rows)}>ppp</button> */}
            </div>

        )}
                                
      />
    </div>
    
   
                
  )
}

export default ClassTableDetail