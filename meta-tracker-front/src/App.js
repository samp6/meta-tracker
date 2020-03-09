import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import NewEntryField from './NewEntryField';
import DateSelector from './DateSelector';

const baseUrl = "http://localhost:5000/meta";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(baseUrl)
        .then(response => response.json())
        .then(responseJson => {
            createRows(responseJson)
        })
  }

  const createRows = (resJson) => {
    let data = [];
    var dataObject = eval(resJson);
    for(var key in dataObject) {
        data.push({
            arch: key,
            freq: dataObject[key].length
        });
    }
    setData(data);
  }

  return (
    <div>
      <DataTable data={data}/>
      <NewEntryField/>
      <DateSelector createRows={createRows} />
    </div>
  )
}

export default App;