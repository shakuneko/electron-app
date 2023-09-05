import { Link } from 'react-router-dom';
import TableDetail from '../components/TableDetail';
import Navbar from '../components/Navbar'

function Table({ classes }) {
    
    return (
        <div className='row'>
            <div className='col-4'>
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
            <div className='col-8 container'>                    
                <div>
                    <h1 className='title'>課程管理</h1>
                    <TableDetail classes={classes} />
                </div>
            </div>
        
        </div>

    )
  }
  
  export default Table