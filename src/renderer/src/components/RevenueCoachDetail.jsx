import React from "react";
import { MaterialReactTable } from 'material-react-table';

function RevenueCoachDetail(props) {
  return (
    <div>
      <MaterialReactTable 
        columns={props.columns}
        data={props.data} 
        initialState={{ 
          showGlobalFilter: true ,
        }} //show filters by default
      
        enableColumnActions={false} //no need for column actions if none of them are enable
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        enableFacetedValues
        muiSearchTextFieldProps={{
            placeholder: "搜尋想查找的資料",
            sx: { minWidth: '300px' },
          }}                                
      />
    </div>           
  )
}

export default RevenueCoachDetail