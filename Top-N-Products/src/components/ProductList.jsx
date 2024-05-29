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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams(location.search);
        const selectedCompany = queryParams.get('company');
        const response = await axios.get(`/categories/${categoryname}/products`, {
          params: { n, page, sort, order, company: selectedCompany }
        });
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
          setError(new Error('Response data is not an array'));
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryname, n, page, sort, order, location.search]);

  return (
    <div className="container mt-5">
      <h1>Products in {categoryname}</h1>
      <div className="mb-3">
        <label htmlFor="sortSelect" className="form-label">Sort by:</label>
        <select id="sortSelect" className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="orderSelect" className="form-label">Order:</label>
        <select id="orderSelect" className="form-select" value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul className="list-group">
          {products.map(product => (
            <li key={product.id} className="list-group-item">
              {product.name} - ${product.price} - {product.rating} stars - {product.company}
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-primary mt-3 me-2" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button className="btn btn-primary mt-3" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ProductList;
