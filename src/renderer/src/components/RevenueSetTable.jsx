import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';

function RevenueSetTable({classes, columns}) {

  return (
    
    <MaterialReactTable 
        columns={columns}
        data={classes} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enabled
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        renderTopToolbarCustomActions={() => (
            <Link to="/form" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增學員</button> 
            </Link>
        )}
                                
    />
                
  )
}

export default RevenueSetTable