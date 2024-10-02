import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update this if needed

// Function to fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`); // Update the URL
        return response.data; // Return the products data
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; //
    }
};

// Example function to fetch welcome message
export const fetchWelcomeMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching welcome message:', error);
        throw error;
    }
};
