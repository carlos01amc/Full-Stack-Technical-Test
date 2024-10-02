import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Dashboard.css';

const UserDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [message, setMessage] = useState(''); 

   
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products'); 
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = async () => {
        if (!title || !description || !price || !category) {
            setMessage('All fields are required!');
            return;
        }

        const newProduct = { title, description, price: parseFloat(price), category };

        try {
            const response = await axios.post('http://localhost:3000/products', newProduct); 
            setProducts([...products, response.data]);
            clearInputs();
            setMessage('Product added successfully!');
        } catch (error) {
            setMessage('Error adding product!');
            console.error(error);
        }
    };

    const updateProduct = async () => {
        if (!title || !description || !price || !category || !editingProduct) {
            setMessage('All fields are required!');
            return;
        }

        const updatedProduct = { ...editingProduct, title, description, price: parseFloat(price), category };

        try {
            const response = await axios.put(`http://localhost:3000/products/${editingProduct.id}`, updatedProduct); 
            setProducts(products.map(product => (product.id === editingProduct.id ? response.data : product)));
            clearInputs();
            setEditingProduct(null);
            setMessage('Product updated successfully!');
        } catch (error) {
            setMessage('Error updating product!');
            console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`); 
            setProducts(products.filter((product) => product.id !== id));
            setMessage('Product deleted successfully!');
        } catch (error) {
            setMessage('Error deleting product!');
            console.error(error);
        }
    };

    const clearInputs = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
    };

    const handleEdit = (product) => {
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setEditingProduct(product);
    };

    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(filter.toLowerCase()) ||
            product.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <h1>Product Dashboard</h1>
            {message && <p className="feedback-message">{message}</p>}
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
                {editingProduct ? (
                    <button onClick={updateProduct}>Update Product</button>
                ) : (
                    <button onClick={addProduct}>Add Product</button>
                )}
                {editingProduct && <button onClick={() => setEditingProduct(null)}>Cancel</button>}
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
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
