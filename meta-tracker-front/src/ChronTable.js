import React, { useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css'

var columns = [
    { key: "date", name: "Date" },
    { key: "arch", name: "Archetype" }
]

const ChronTable = ({allData}) => {

    // convert data to applicable format here
    allData.forEach(entry => {
        var d = new Date(0);
        d.setUTCSeconds(entry.date);
        entry.date = d.toDateString();
    });

    return (
        <ReactDataGrid 
            columns={columns}
            rowGetter={i => allData[i]}
            rowsCount={allData.length}
        />
    )
}

export default ChronTable;