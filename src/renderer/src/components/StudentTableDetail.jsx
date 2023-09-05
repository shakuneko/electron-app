import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, {  selectFilter  } from 'react-bootstrap-table2-filter';

import { Link } from 'react-router-dom';

function StudentTableDetail({ classes }) {
    const pagination = paginationFactory( { //設定標籤頁碼
        //pageStartIndex: 0,
        sizePerPage: 5,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        classes:'test'
      });
    const CheckOut = (data, row) => { //設定查看按鈕要進入的頁面
        return<>
           <Link to="/form" className='table-link-underline-none'>
                {/* 後面改用Link */}
                <button type="button" className="btn btn-golden">查看{data}</button> 
                {/* 測試按鈕點擊 */}
            </Link>
        </>
    };
    const columns = [
        {
            dataField:"student",
            text:"學員"
        },
        {
            dataField:"stuGender",
            text:"性別"
        },
        {
            dataField:"stuPhone",
            text:"電話"
        },
        {
            dataField:"createDate",
            text:"建檔日期",
            sort:true,
        },
        {
            dataField:"note",
            text:"備註"
        },
        {
            dataField:"id",
            text:"操作",
            formatter:CheckOut
        }
    ]
    const MySearch = (props) => { //設定搜尋樣式
        let input;
        const handleClick = () => {
          props.onSearch(input.value);
        };
        return (
          <div className='row h-50 mb-3'>
            <Link to="/studentdetail" className='col-6  table-link-underline-none'>
                <button className="btn btn-golden">新增學員</button>
                {/* <SearchBar { ...props.searchProps } /> */}
            </Link>
            <div className='col-6 search-area'>
                <div className="input-group flex-nowrap">
                    {/* <span class="input-group-text" id="addon-wrapping">@</span> */}
                    <input ref={ n => input = n } type="text" onKeyUp={handleClick} className="form-control" placeholder="輸入內容..." aria-label="輸入內容..." aria-describedby="addon-wrapping"/>
                    <button className="btn btn-golden" onClick={ handleClick } type="button" id="button-sreach">搜尋</button>
                </div>
            </div>

          </div>
        );
    };

    return (
        <ToolkitProvider
            keyField="id"
            data={ classes }
            columns={ columns }
            filter
            search
        >
        {
            props => (
            <div>
                <MySearch { ...props.searchProps } />

                <BootstrapTable
                { ...props.baseProps }
                bootstrap4
                hover 
                headerClasses="column-header"
                classes="table-items"
                pagination={ pagination }
                filter={ filterFactory() } 
                />
            </div>
            )
        }
        </ToolkitProvider>
    )
  }
  
  export default StudentTableDetail