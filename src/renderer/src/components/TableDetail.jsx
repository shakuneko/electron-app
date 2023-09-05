import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, {  selectFilter  } from 'react-bootstrap-table2-filter';

function TableDetail({ classes, columns }) {
    const pagination = paginationFactory( { //設定標籤頁碼
        //pageStartIndex: 0,
        sizePerPage: 5,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        classes:'test'
      });

    const MySearch = (props) => { //設定搜尋樣式
        let input;
        const handleClick = () => {
          props.onSearch(input.value);
        };
        const addNewData = () => { 
            return <>
                onClick={alert("新增資料")}
            </>
        }
        return (
          <div className='row h-50 mb-3 row-no-gutter'>
            <div className='col-6'>
                <button className="btn btn-golden" onClick={ addNewData }>新增資料</button>
                {/* <SearchBar { ...props.searchProps } /> */}
            </div>
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
  
  export default TableDetail