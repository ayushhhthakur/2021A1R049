import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const ProductList = () => {
  const { categoryname } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [n, setN] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');

  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`/categories/${categoryname}/products`, {
        params: { n, page, sort, order, company: selectedCompany }
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, [categoryname, n, page, sort, order, selectedCompany]);

  return (
    <div>
      <h1>Products in {categoryname}</h1>
      <div>
        <label>
          Sort by:
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="company">Company</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={e => setOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.rating} stars - {product.company}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ProductList
