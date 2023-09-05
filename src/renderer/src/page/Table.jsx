import Navbar from '../components/Navbar'
import TableDetail from '../components/TableDetail'

function Table({ classes }) {
    
    return (
        <div className='row row-no-gutter margin-left-right container-fluid'>
            <div className='nav col-2'>
                <Navbar/>
            </div>
            <div className='col-10 container margin-left-right'>                    
                <div className='mt-4 table-container'>
                    <h1 className='title'>課程管理</h1>
                    <TableDetail classes={classes} />
                    {/* <TableColumn classes={classes}/> */}
                </div>
            </div>
        </div>
    )
  }
  
  export default Table