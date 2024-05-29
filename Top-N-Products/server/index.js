const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

async function fetchProducts(category, company, minPrice = 0, maxPrice = 10000, top = 10) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company} for category ${category}:`, error.message);
        return [];
    }
}

// Function to save response data to JSON file
function saveResponseToFile(data, filename) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error('Error writing to JSON file:', err);
        } else {
            console.log('Response data saved to JSON file:', filename);
        }
    });
}

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sort, order = 'asc', minPrice = 0, maxPrice = 10000 } = req.query;
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    let products = [];

    for (const company of companies) {
        const companyProducts = await fetchProducts(categoryname, company, minPrice, maxPrice, n);
        products = products.concat(companyProducts);
    }

    // Save response data to JSON file
    saveResponseToFile(products, 'products.json');

    if (sort) {
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] > b[sort] ? 1 : -1;
            } else {
                return a[sort] < b[sort] ? 1 : -1;
            }
        });
    }

    const paginatedProducts = products.slice((page - 1) * n, page * n);

    res.json(paginatedProducts);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
