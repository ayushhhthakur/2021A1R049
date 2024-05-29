import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { categoryname, productid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/categories/${categoryname}/products/${productid}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching product details:`, error.message);
                setError(error);
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [categoryname, productid]);

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">Error: {error.message}</div>;
    }

    if (!product) {
        return <div className="container mt-5">Product not found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1>{product.productName}</h1>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating} stars</p>
            <p>Description: {product.description}</p>
        </div>
    );
};

export default ProductDetails;
