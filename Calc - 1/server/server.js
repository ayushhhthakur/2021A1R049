const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9876;

app.use(cors());

const windowSize = 10;
let numberWindow = [];

const fetchNumbers = async (type) => {
    const urlMap = {
        'p': 'http://20.244.56.144/test/primes',
        't': 'http://20.244.56.144/test/fibo',
        'e': 'http://20.244.56.144/test/even',
        'r': 'http://20.244.56.144/test/rand'
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE2OTYyMjU1LCJpYXQiOjE3MTY5NjE5NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI4OTdhNDMxLTJjMjUtNDQ0NC05Y2VmLTI1ZjU5YmQ5NTRjMSIsInN1YiI6ImF5dXNodGhha3VyMTQxMkBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJheXVzaGhodGhha3VyIiwiY2xpZW50SUQiOiIyODk3YTQzMS0yYzI1LTQ0NDQtOWNlZi0yNWY1OWJkOTU0YzEiLCJjbGllbnRTZWNyZXQiOiJvTXhWSmtnWGlKeVBXdUVqIiwib3duZXJOYW1lIjoiQXl1c2giLCJvd25lckVtYWlsIjoiYXl1c2h0aGFrdXIxNDEyQGdtYWlsLmNvbSIsInJvbGxObyI6IjIwMjFhMXIwNDkifQ.ZtTwZ-2w-5eeKQsEuCb7_dxu_ts7wtv9dmP8VzzvQjQ";

    try {
        const response = await axios.get(urlMap[type], {
            timeout: 1000,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.numbers;
    } catch (error) {
        if (error.response) {
            console.error(`Error fetching ${type} numbers:`, error.response.status, error.response.data);
        } else if (error.request) {
            console.error(`Error fetching ${type} numbers: No response received`);
        } else {
            console.error(`Error fetching ${type} numbers:`, error.message);
        }
        return [];
    }
};

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    const validTypes = ['p', 't', 'e', 'r'];

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const newNumbers = await fetchNumbers(type);
    const uniqueNewNumbers = [...new Set(newNumbers)];

    const prevWindowState = [...numberWindow];
    numberWindow = [...numberWindow, ...uniqueNewNumbers].slice(-windowSize);
    const currentWindowState = [...numberWindow];

    const average = calculateAverage(currentWindowState);

    res.json({
        windowPrevState: prevWindowState,
        windowCurrState: currentWindowState,
        numbers: uniqueNewNumbers,
        avg: average
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
