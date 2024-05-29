import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const ProductPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany && selectedCategory) {
      navigate(`/categories/${selectedCategory}/products?company=${selectedCompany}`);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Select company and category</h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companySelect" className="form-label">Select Company:</label>
          <select id="companySelect" className="form-select" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">Select a company</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select Category:</label>
          <select id="categorySelect" className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Search Products</button>
      </form>
    </div>
  );
};

export default ProductPage;
