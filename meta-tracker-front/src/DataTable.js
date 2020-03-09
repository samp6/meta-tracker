import React from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css'

const columns = [
    { key: "freq", name: "Frequency" }, 
    { key: "arch", name: "Archetype" }
]

let DataTable = ({data}) => {


    return (
        <ReactDataGrid 
            columns={columns}
            rowGetter={i => data[i]}
            rowsCount={data.length}
        />
    )
}

export default DataTable;
