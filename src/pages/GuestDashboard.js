import React from 'react';
import './Dashboard.css';

const GuestDashboard = () => {
    const products = [
        { id: 1, title: 'Product 1', description: 'Description of Product 1', price: 29.99, category: 'Category A' },
        { id: 2, title: 'Product 2', description: 'Description of Product 2', price: 49.99, category: 'Category B' },
        { id: 3, title: 'Product 3', description: 'Description of Product 3', price: 19.99, category: 'Category A' },
        { id: 4, title: 'Product 4', description: 'Description of Product 4', price: 39.99, category: 'Category C' },
    ];

    return (
        <div className="dashboard-container">
            <h1>Product Catalog</h1>
            <p>Check out our available products:</p>
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
            
        </div>
    );
};

export default GuestDashboard;
