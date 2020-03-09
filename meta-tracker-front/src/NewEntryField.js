import React, { useState } from 'react';

const baseUrl = 'http://localhost:5000/meta/'

const NewEntryField = () => {
    const [entry, setEntry] = useState("");

    const handleSubmit = event => {
        fetch(baseUrl + entry, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})  
        });
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