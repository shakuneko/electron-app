import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom'

function ClassDetailTable({ classes }) {
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
  const selectRow = {//全選
    mode: 'checkbox',
    clickToSelect: false,
    hideSelectAll: true
    
  };
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
      dataField: 'createDate',
      text: '日期'
    },
    {
      dataField: 'reserveTime',
      text: '時間'
    },

    {
      dataField: 'exCourse',
      text: '是否來上課',
    //   classes: (cell, row, rowIndex, colIndex) => {
    //     if (cell === 'Yes') return 'alert-mode'
    //   },
    editor: {
        type: Type.CHECKBOX,
        value: '是:否'
      }
     
    },
    {
      dataField: 'exCourse',
      text: '取消預約',
    //   classes: (cell, row, rowIndex, colIndex) => {
    //     if (cell === 'Yes') return 'alert-mode'
    //   }
    editor: {
        type: Type.CHECKBOX,
        value: '是:否'
      }
    },
    {
      dataField: 'note',
      text: '備註',
      formatter: AddBGC
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
          {/* <MySearch { ...props.searchProps } /> */}

          <BootstrapTable
            {...props.baseProps}
            bootstrap4
            hover
            headerClasses="column-header"
            classes="table-items"
            pagination={pagination}
            filter={filterFactory()}
            selectRow={ selectRow }
            noDataIndication={'尚無資料'}
            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

export default ClassDetailTable
