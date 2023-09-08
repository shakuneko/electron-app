import Navbar from '../components/Navbar'
// import CoachTableDetail from '../components/CoachTableDetail'

function CouchTable({ classes }) {
    
    return (
        <div className='row row-no-gutter margin-left-right container-fluid'>
            <div className='nav col-2'>
                <Navbar/>
            </div>
            <div className='col-10 container margin-left-right'>                    
                <div className='mt-4 table-container'>
                    <h1 className='title'>教練管理</h1>
                    {/* <CoachTableDetail classes={classes}/> */}
                </div>
            </div>
        </div>
    )
  }
  
  export default CouchTable