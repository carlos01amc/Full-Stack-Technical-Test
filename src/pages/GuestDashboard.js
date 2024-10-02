import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api.js'; // 
import './Dashboard.css';

const GuestDashboard = () => {
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const getProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts(); // Fetch products from the API
                setProducts(fetchedProducts); // Set products to state
            } catch (err) {
                setError('Failed to fetch products'); // Set error if fetching fails
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        getProducts();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Product Catalog</h1>
            <p>Check out our available products:</p>
            {loading ? ( // Display loading message while fetching
                <p>Loading products...</p>
            ) : error ? ( // Display error message if there's an error
                <p>{error}</p>
            ) : (
                <div className="product-list">
                    {products.length === 0 ? (
                        <p>No products available at the moment.</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="product-item">
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Category: {product.category}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default GuestDashboard;
