import React, { useState } from 'react';
import './Dashboard.css';

const UserDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    const addProduct = () => {
        if (!title || !description || !price || !category) return;

        const newProduct = { title, description, price, category, id: Date.now() };
        setProducts([...products, newProduct]);
        clearInputs();
    };

    const clearInputs = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
    };

    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(filter.toLowerCase()) ||
            product.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <h1>Product Dashboard</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by name or category"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <h2>Product List</h2>
            <ul className="product-list">
                {filteredProducts.map((product) => (
                    <li key={product.id} className="product-item">
                        <div>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                        <div className="button-group">
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
