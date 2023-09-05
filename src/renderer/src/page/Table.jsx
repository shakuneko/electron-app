import { Link } from 'react-router-dom';
import TableDetail from '../components/TableDetail';
import Navbar from '../components/Navbar'
import TableColumn from '../components/TableColumn';

function Table({ classes }) {
    
    return (
        <div className='row row-no-gutter margin-left-right'>
            <div className='nav col-2'>
                <Navbar/>
                {/* <div className="nav-item">
                    <Link to="/" class="col nav-word">課程管理</Link>
                </div>
                <div className="nav-item">
                    <Link to="/test" class="col nav-word">學員管理</Link>
                </div>
                <div className="nav-item">
                    <Link to="/test" class="col nav-word">教練管理</Link>
                </div> */}
            </div>
            <div className='col-10 container margin-left-right'>                    
                <div className='mt-4 table-container'>
                    <h1 className='title'>課程管理</h1>
                    {/* <TableDetail classes={classes} /> */}
                    <TableColumn classes={classes}/>
                </div>
            </div>
        
        </div>

    )
  }
  
  export default Table