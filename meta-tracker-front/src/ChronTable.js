import React from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css'

const baseUrl = 'http://localhost:5000/meta/'

var columns = [
    { key: "datetime", name: "Date" },
    { key: "arch", name: "Archetype", editable: true }
]

const ChronTable = ({allData, fetchData}) => {

    // convert data to applicable format here
    allData.forEach(entry => {
        var d = new Date(0);
        d.setUTCSeconds(entry.date);
        entry.datetime = d.toDateString();
    });


    const getEditActions = (id) => {
        return [
            {
                icon: "Delete",
                callback: () => {
                    fetch(baseUrl + "delete/" + id, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({})
                    });
                    fetchData();
                }
            }, 
            {
                icon: "Edit",
                callback: () => {
                    const newName = prompt("Enter a new name: ");
                    fetch(baseUrl + "edit/" + id + "/" + newName, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({})
                    });
                    fetchData();
                }
            }
        ];
    }
    
    
    const getCellActions = (column, row) => {
        const cellActions = {
            arch: getEditActions(row.id)
        };
        return cellActions[column.key];
    }

    return (
        <ReactDataGrid 
            columns={columns}
            rowGetter={i => allData[i]}
            rowsCount={allData.length}
            getCellActions={getCellActions}
        />
    )
}

export default ChronTable;