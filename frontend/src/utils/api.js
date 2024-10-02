import axios from 'axios';

const API_URL = 'http://localhost:3000';
const API_URL_P = `${API_URL}/products`;

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL_P);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL_P, product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL_P}/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL_P}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

