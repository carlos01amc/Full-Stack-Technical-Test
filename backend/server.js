const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const usersFilePath = './users.json';
const productsFilePath = './products.json';

// Read products from the file
const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

// Write products to the file
const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

app.get('/products', (req, res) => {
    try {
        const products = readProductsFromFile();
        res.json(products);
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/products', (req, res) => {
    const newProduct = req.body;

    const products = readProductsFromFile();

    newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const productExists = products.find(product => product.title === newProduct.title);
    if (productExists) {
        return res.status(400).json({ message: 'Product with this title already exists.' });
    }

    products.push(newProduct);

    writeProductsToFile(products);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    const products = readProductsFromFile();

    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[index] = { id: parseInt(id), ...updatedProduct };

    writeProductsToFile(products);
    res.status(200).json({ message: 'Product updated successfully!', product: products[index] });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const products = readProductsFromFile();
    const updatedProducts = products.filter(product => product.id !== parseInt(id));

    if (products.length === updatedProducts.length) {
        return res.status(404).json({ message: 'Product not found' });
    }

    writeProductsToFile(updatedProducts);
    res.status(200).json({ message: 'Product deleted successfully!' });
});


// Helper function to read and write users
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const users = readUsersFromFile();

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
    };

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
