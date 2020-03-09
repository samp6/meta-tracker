import React, { useState } from 'react'

// hardcoded now, configurable later
let dates = ["1 Day", "2 Days", "1 Week"];
let datesVals = [1, 2, 7];
const baseUrl = "http://localhost:5000/meta/"

const DateSelector = (props) => {
    let createRows = props.createRows;
    let initArray = [];
    for(let i = 0; i < dates.length; i++) {
        initArray[i] = false;
    }
    const [checkedArray, setCheckedArray] = useState(initArray);

    const selectors = [];
    const changedHandlers = [];
    for(let i = 0; i < dates.length; i++) {
        changedHandlers[i] = () => {
            if(checkedArray[i] == true) {
                checkedArray[i] = false;
                setCheckedArray(checkedArray);
                fetch(baseUrl)
                    .then(response => response.json())
                    .then(responseJson => {
                        return createRows(responseJson)
                    });
            } else {
                for(let j = 0; j < checkedArray.length; j++) {
                    if(j != i) {
                        checkedArray[j] = false;
                    } else {
                        checkedArray[j] = true;
                    }
                }
                setCheckedArray(checkedArray);

                let currentDate = Math.round(Date.now()/1000);
                let unixDate = currentDate - (datesVals[i]*24*60*60);
                fetch(baseUrl + unixDate)
                    .then(response => response.json())
                    .then(responseJson => {
                        return createRows(responseJson)
                    });
            }
        }
        selectors[i] = 
            <div>
                {dates[i]}
                <input name={dates[i]} type="checkbox" checked={checkedArray[i]} onChange={changedHandlers[i]} />
            </div>
    }

    return (
        <div>
            {selectors}
        </div>
    )
}

export default DateSelector