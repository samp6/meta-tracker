import React, { useState } from 'react';

const baseUrl = 'http://localhost:5000/meta/'

const NewEntryField = (props) => {
    const [entry, setEntry] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        fetch(baseUrl + "create/" + entry, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        props.fetchData();
        setEntry("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {"New: "}
                <input type="text" value={entry} onChange={e => setEntry(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewEntryField