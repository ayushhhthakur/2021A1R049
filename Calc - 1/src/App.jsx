import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [type, setType] = useState('e');
    const [response, setResponse] = useState(null);

    const fetchNumbers = async () => {
        try {
            const res = await axios.get(`http://localhost:9876/numbers/${type}`);
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="p">Prime</option>
                <option value="t">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={fetchNumbers}>Fetch Numbers</button>
            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
