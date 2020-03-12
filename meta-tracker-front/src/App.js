import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import NewEntryField from './NewEntryField';
import DateSelector from './DateSelector';
import ChronTable from './ChronTable';

const baseUrl = "http://localhost:5000/meta/";

const App = () => {
  const [data, setData] = useState({
    freqData: [],
    allData: []
  });
  const [editing, setEditing]  = useState(false);

  useEffect(() => {
    fetchData();
  }, {});

  const fetchData = () => {
    fetch(baseUrl)
        .then(response => response.json())
        .then(responseJson => {
            createRows(responseJson)
        })
  }

  const createRows = (resJson) => {
    let newData = {
      freqData: [],
      allData: []
    };
    var dataObject = eval(resJson);
    for(var key in dataObject) {
        newData.freqData.push({
            arch: key,
            freq: dataObject[key].length,
        });
        dataObject[key].forEach(entry => {
          var entryObject = JSON.parse(entry);
          newData.allData.push(entryObject);
        });
    }
    setData(newData);
  }

  var editBtnLabel = editing? "Save" : "Edit";
  var editBtn = <button onClick={() => {setEditing(!editing)}} >{editBtnLabel}</button>;

  var content;
  if(editing) {
    content = <ChronTable allData={data.allData} fetchData={fetchData} />;
  } else {
    content = <DataTable freqData={data.freqData}/>;
  }

  return (
    <div>
      {content}
      <NewEntryField fetchData={fetchData} />
      {editBtn}
      <DateSelector createRows={createRows} />
    </div>
  )
}

export default App;