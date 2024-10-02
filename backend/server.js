const express = require('express');
const cors = require('cors');
const fs = require('fs'); // File system module to read/write files
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

const app = express();
const PORT = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const usersFilePath = './users.json'; // Path to users JSON file
const productsFilePath = './products.json';

app.get('/products', (req, res) => {
    try {
        const products = readProductsFromFile(); // Read the products
        res.json(products); // Serve the products
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await readProductsFromFile();
        const updatedProducts = products.filter(product => product.id !== parseInt(id));
        await writeProductsToFile(updatedProducts);
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body; // Get the updated product data from the request body

    // Read current products from file
    const products = JSON.parse(fs.readFileSync(productsFilePath));

    // Find the index of the product to update
    const index = products.findIndex(product => product.id === parseInt(id));

    // Check if product exists
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product in the array
    products[index] = { id: parseInt(id), ...updatedProduct }; // Ensure the ID is maintained

    // Write updated products back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.status(200).json({ message: 'Product updated successfully!', product: products[index] });
});

// Add a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;

    // Read current products from the file
    const products = readProductsFromFile();

    // Assign a new ID (incrementing from the last ID)
    newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1; // Ensure ID is unique

    // Optional: Check for existing product by title or other attributes (if needed)
    const productExists = products.find(product => product.title === newProduct.title);
    if (productExists) {
        return res.status(400).json({ message: 'Product with this title already exists.' });
    }

    // Add the new product to the list
    products.push(newProduct);

    // Write updated products back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    // Respond with the new product data
    res.status(201).json(newProduct);
});

// Helper function to read products from the JSON file
const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const users = readUsersFromFile();

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
    };

    // Save the new user to the file
    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({ message: 'User registered successfully.' });
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const users = readUsersFromFile();
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token (you might want to set an expiration time)
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
