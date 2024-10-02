import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../utils/api';
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
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const products = await fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!title || !description || !price || !category) {
            setMessage('All fields are required!');
            return;
        }

        const newProduct = {
            title,
            description,
            price: parseFloat(price),
            category,
        };

        try {
            await addProduct(newProduct);
            clearInputs();
            setMessage('Product added successfully!');
            loadProducts();
        } catch (error) {
            setMessage('Error adding product!');
            console.error(error);
        }
    };

    const handleUpdateProduct = async () => {
        if (!title || !description || !price || !category || !editingProduct) {
            setMessage('All fields are required!');
            return;
        }

        const updatedProduct = { title, description, price: parseFloat(price), category };

        try {
            await updateProduct(editingProduct.id, updatedProduct);
            clearInputs();
            setEditingProduct(null);
            setMessage('Product updated successfully!');
            loadProducts();
        } catch (error) {
            setMessage('Error updating product!');
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setMessage('Product deleted successfully!');
            loadProducts();
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
        setEditingProduct(null);
    };

    
    const handleEdit = (product) => {
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setEditingProduct(product);

        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
    };

    const filteredProducts = products.filter(
        (product) =>
            (product.title && product.title.toLowerCase().includes(filter.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(filter.toLowerCase()))
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
                    <>
                        <button onClick={handleUpdateProduct}>Update Product</button>
                        <button onClick={clearInputs}>Cancel Edit</button>
                    </>
                ) : (
                    <button onClick={handleAddProduct}>Add Product</button>
                )}
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
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Category: {product.category}</p>
                        </div>
                        <div className="button-group">
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
