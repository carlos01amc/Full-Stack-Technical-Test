import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api.js';  
import './Dashboard.css';

const GuestDashboard = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts(); 
                setProducts(fetchedProducts); 
            } catch (err) {
                setError('Failed to fetch products'); 
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };

        getProducts();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Product Catalog</h1>
            <p>Check out our available products:</p>
            {loading ? ( 
                <p>Loading products...</p>
            ) : error ? ( 
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
