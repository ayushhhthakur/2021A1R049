import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
      setError('');
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setError('Error fetching numbers. Please try again later.');
    }
  };

  const handleFetch = () => {
    if (numberId) {
      fetchNumbers();
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 rounded">
        <h1 className="text-center mb-4">Average Calculator</h1>
        <div className="form-group">
          <select
            className="form-control"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
          >
            <option value="">Select number ID</option>
            <option value="p">Primes</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleFetch}>Fetch Numbers</button>
        </div>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {response && (
          <div className="mt-4">
            <h2 className="text-center mb-3">Response</h2>
            <p><strong>Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
            <p><strong>Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
            <p><strong>Fetched Numbers:</strong> {JSON.stringify(response.numbers)}</p>
            <p><strong>Average:</strong> {response.avg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
