import React, { useState, useCallback, useEffect } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStuStatus } from '../redux/reducers/saveSlice'

//confirm
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function StudentTableDetail({classes}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [newStuStatus, setNewStuStatus] = useState(() => classes);
    const [newClassStatus, setNewClassStatus] = useState(() => classes);

    useEffect(() => {
        const stuIDToNum = classes.map((item) => {
                if (typeof item.stuID === "string") {
                return {
                    ...item,
                    stuID: parseInt(item.stuID, 10),
                };
                }
                return item;
            });
            console.log(" stuIDToNum", stuIDToNum);
            setNewClassStatus(stuIDToNum);
    }, []);

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
    const handleDeleteRow = useCallback((row) => {
        const newTableData = classes.filter((item, index) => index !== row.index);
        console.log("newTableData data", newTableData);
        dispatch(updateStuStatus(newTableData));

        const stuIDToNum = newTableData.map((item) => {
          if (typeof item.stuID === "string") {
            return {
              ...item,
              stuID: parseInt(item.stuID, 10),
            };
          }
          return item;
        });
        console.log("stuIDToNum data", stuIDToNum);
        setNewClassStatus(stuIDToNum);
      }, [classes]);
      

    //操作BTN
    const CheckOut = ({renderedCellValue, row}) => { //設定查看按鈕要進入的頁面
        return<>
            <div style={{display:"flex", flexDirection:"row"}}>
                <Link to={`/student/name/${renderedCellValue}`} className='table-link-underline-none'>
                        <button type="button" className="btn btn-golden">查看</button> 
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => handleClickOpen(row)}>              
                    刪除
                </button> 
            </div>
        </>
    };

    const columns = [ //表格有的資料
        {
            accessorKey:"stuID",
            header:"#",
            size:50,
        },
        {
            accessorKey:"stuName",
            header:"學員",
            size:100,
        },
        {
            accessorKey:"stuGender",
            header:"性別",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"stuPhone",
            header:"電話",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"stuBirth",
            header:"生日日期",
            size:100,
        },
        {
            accessorKey:"stuNote",
            header:"備註",
            size:150,
            enableSorting: false
        },
        {
            accessorKey:"stuID",
            id:"changePage",
            header:"操作",
            size:50,
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
                showGlobalFilter: true,
                sorting: [
                    { id: 'stuID', desc: true }, //sort by classID in descending order by default
                ],
            }} //show filters by default
            enableColumnActions={false} //no need for column actions if none of them are enabled
            enableDensityToggle={false} //density does not work with memoized table body
            enableFullScreenToggle={false}
            enableHiding={false} //column hiding does not work with memoized table body
            enableStickyHeader
            renderTopToolbarCustomActions={() => (
                <Link to="/student/form" className='table-link-underline-none'>
                    <button type="button" className="btn btn-golden">新增學員</button> 
                    {/* <button onClick={()=> console.log(stuArray)}>pp</button> */}
                </Link>
            )}
            muiSearchTextFieldProps={{
                placeholder: "搜尋想查找的名稱、堂數",
                sx: { minWidth: '300px' },
            }}

        />
    </div>
    
                
  )
}

export default StudentTableDetail