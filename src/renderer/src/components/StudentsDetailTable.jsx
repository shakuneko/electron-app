import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'

import { Link } from 'react-router-dom'

function StudentsDetailTable({ classes }) {
  const pagination = paginationFactory({
    //設定標籤頁碼
    //pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    classes: 'test'
  })
  const CheckOut = (data, row) => {
    //設定查看按鈕要進入的頁面
    return (
      <>
        <Link to="/form">
          {/* 後面改用Link */}
          <button type="button" className="btn btn-golden">
            查看{data}
          </button>
          {/* 測試按鈕點擊 */}
        </Link>
      </>
    )
  }
  const AddBGC = (data) => {
    // 設定邊框
    let e

    if (data == '快要截止')
      e = (
        <span style={{ backgroundColor: '#dee2e6', padding: '10px', borderRadius: '5px' }}>
          {data}
        </span>
      )
    else if (data == '已截止')
      e = (
        <span
          style={{
            backgroundColor: '#F16D6D',
            padding: '10px',
            borderRadius: '5px',
            color: 'white'
          }}
        >
          {data}
        </span>
      )
    else e = <div>{data}</div>

    return e
  }
  const selectOptions = {
    //下拉選單篩選
    PT: 'PT',
    皮拉提斯: '皮拉提斯',
    團課: '團課',
    場地租借: '場地租借'
  }
  const columns = [
    //表格有的資料
    {
      dataField: 'couch',
      text: '教練'
    },
    {
      dataField: 'courseType',
      text: '課程種類',
      // formatter: cell => cell,
      formatter: (cell) => selectOptions[cell], //能自由加入東西
      filter: selectFilter({
        options: selectOptions,
        placeholder: '課程種類篩選',
        className: 'form-select'
      })
    },
    {
      dataField: 'student',
      text: '學員'
    },
    {
      dataField: 'courseLeft',
      text: '剩餘堂數',
      sort: true, //降冪 & 升冪
      classes: (cell, row, rowIndex, colIndex) => {
        //設定判斷樣式
        if (cell === '0') return 'alert-mode'
      }
    },
    {
      dataField: 'coursesAll',
      text: '總堂數'
    },
    {
      dataField: 'exCourse',
      text: '體驗課',
      classes: (cell, row, rowIndex, colIndex) => {
        if (cell === 'Yes') return 'alert-mode'
      }
    },
    {
      dataField: 'status',
      text: '狀態',
      formatter: AddBGC
    },
    {
      dataField: 'id',
      text: '操作',
      formatter: CheckOut
    }
  ]
  const MySearch = (props) => {
    //設定搜尋樣式
    let input
    const handleClick = () => {
      props.onSearch(input.value)
    }
    const addNewData = () => {
      return <>onClick={alert('新增資料')}</>
    }
    return (
      <div className="row h-50 mb-3">
        <div className="col-6">
          <button className="btn btn-golden" onClick={addNewData}>
            新增課程
          </button>
          {/* <SearchBar { ...props.searchProps } /> */}
        </div>
        <div className="col-6 search-area">
          <div className="input-group flex-nowrap">
            {/* <span class="input-group-text" id="addon-wrapping">@</span> */}
            <input
              ref={(n) => (input = n)}
              type="text"
              onKeyUp={handleClick}
              className="form-control"
              placeholder="輸入內容..."
              aria-label="輸入內容..."
              aria-describedby="addon-wrapping"
            />
            <button
              className="btn btn-golden"
              onClick={handleClick}
              type="button"
              id="button-sreach"
            >
              搜尋
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ToolkitProvider keyField="id" data={classes} columns={columns} filter search>
      {(props) => (
        <div>
            <div className='doneClasses'>

            </div>
          <div className="stutopbar">
            <div className="btnbox-item-stu">
              <h3>2023 購買記錄</h3>

              <div className="btnbox">
                <div className="btnbox-item">
                  <button type="button" className="btn btn-golden">
                    全部
                  </button>
                </div>
                <div className="btnbox-item">
                  <button type="button" className="btn btn-primary">
                    PT
                  </button>
                </div>
                <div className="btnbox-item">
                  <button type="button" className="btn btn-primary">
                    皮拉提斯
                  </button>
                </div>
                <div className="btnbox-item">
                  <button type="button" className="btn btn-primary">
                    刪除
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <MySearch { ...props.searchProps } /> */}

          <BootstrapTable
            {...props.baseProps}
            bootstrap4
            hover
            headerClasses="column-header"
            classes="table-items"
            pagination={pagination}
            filter={filterFactory()}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

export default StudentsDetailTable
