const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const window = [];
const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE2OTYyMjU1LCJpYXQiOjE3MTY5NjE5NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI4OTdhNDMxLTJjMjUtNDQ0NC05Y2VmLTI1ZjU5YmQ5NTRjMSIsInN1YiI6ImF5dXNodGhha3VyMTQxMkBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJheXVzaGhodGhha3VyIiwiY2xpZW50SUQiOiIyODk3YTQzMS0yYzI1LTQ0NDQtOWNlZi0yNWY1OWJkOTU0YzEiLCJjbGllbnRTZWNyZXQiOiJvTXhWSmtnWGlKeVBXdUVqIiwib3duZXJOYW1lIjoiQXl1c2giLCJvd25lckVtYWlsIjoiYXl1c2h0aGFrdXIxNDEyQGdtYWlsLmNvbSIsInJvbGxObyI6IjIwMjFhMXIwNDkifQ.ZtTwZ-2w-5eeKQsEuCb7_dxu_ts7wtv9dmP8VzzvQjQ";

const verifyTypeUrls = {
  'p': 'http://20.244.56.144/test/primes',
  'f': 'http://20.244.56.144/test/fibo',
  'e': 'http://20.244.56.144/test/even',
  'r': 'http://20.244.56.144/test/rand'
};

app.use(cors());

app.get('/test/:typeId', async (req, res) => {
  const typeId = req.params.typeId;

  if (!verifyTypeUrls[typeId]) {
    return res.status(400).send({ error: "Invalid ID. Use 'p' for primes, 'f' for Fibonacci, 'e' for even, 'r' for random." });
  }

  const url = verifyTypeUrls[typeId];
  const prevState = [...window];

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${auth_token}` },
      timeout: 5000
    });
    const fetchedNumbers = response.data.numbers;

    const uniqueNumbers = Array.from(new Set(fetchedNumbers));
    uniqueNumbers.forEach(number => {
      if (!window.includes(number)) {
        if (window.length >= WINDOW_SIZE) {
          window.shift();
        }
        window.push(number);
      }
    });

    const currState = [...window];
    const avg = window.length ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0;

    res.send({
      windowPrevState: prevState,
      windowCurrState: currState,
      numbers: uniqueNumbers,
      avg: avg,
      expires_in: 1717200000 // Hardcoded expires_in for demonstration purposes
    });

  } catch (error) {
    // Log different types of errors
    if (error.response) {
      console.error("Error response received:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    res.send({
      windowPrevState: prevState,
      windowCurrState: window,
      numbers: [],
      avg: window.length ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
