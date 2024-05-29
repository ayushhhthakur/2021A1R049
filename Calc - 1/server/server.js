const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const window = [];
const auth_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE2OTYyMjU1LCJpYXQiOjE3MTY5NjE5NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI4OTdhNDMxLTJjMjUtNDQ0NC05Y2VmLTI1ZjU5YmQ5NTRjMSIsInN1YiI6ImF5dXNodGhha3VyMTQxMkBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJheXVzaGhhdGhha3VyIiwiY2xpZW50SUQiOiIyODk3YTQzMS0yYzI1LTQ0NDQtOWNlZi0yNWY1OWJkOTU0YzEiLCJjbGllbnRTZWNyZXQiOiJvTXhWSmtnWGlKeVBXdUVqIiwib3duZXJOYW1lIjoiQXl1c2giLCJvd25lckVtYWlsIjoiYXl1c2h0aGFrdXIxNDEyQGdtYWlsLmNvbSIsInJvbGxObyI6IjIwMjFhMXIwNDkifQ.ZtTwZ-2w-5eeKQsEuCb7_dxu_ts7wtv9dmP8VzzvQjQ";

const numberTypeUrls = {
  'p': 'http://20.244.56.144/test/primes',
  'f': 'http://20.244.56.144/test/fibo',
  'e': 'http://20.244.56.144/test/even',
  'r': 'http://20.244.56.144/test/rand'
};

app.use(cors());

app.get('/numbers/:numberId', async (req, res) => {
  const numberId = req.params.numberId;

  if (!numberTypeUrls[numberId]) {
    return res.status(400).send({ error: "Invalid number ID. Use 'p' for primes, 'f' for Fibonacci, 'e' for even, 'r' for random." });
  }

  const url = numberTypeUrls[numberId];
  const prevState = [...window];

  try {
    const response = await axios.get(url, {
      headers: { Authorization: auth_token },
      timeout: 500
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
      avg: avg
    });

  } catch (error) {
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
