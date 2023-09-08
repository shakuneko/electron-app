import Navbar from '../components/Navbar'
// import StudentTableDetail from '../components/StudentTableDetail';

function StudentTable({ classes }) {
    
    return (
        <div className='row row-no-gutter margin-left-right container-fluid'>
            <div className='nav col-2'>
                <Navbar/>
            </div>
            <div className='col-10 container margin-left-right'>                    
                <div className='mt-4 table-container'>
                    <h1 className='title'>學員管理</h1>
                    {/* <TableDetail classes={classes} /> */}
                    {/* <StudentTableDetail classes={classes}/> */}
                </div>
            </div>
        </div>
    )
  }
  
  export default StudentTable