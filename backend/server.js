const express = require('express');
const cors = require('cors');
const fs = require('fs'); // File system module to read/write files
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usersFilePath = './users.json'; // Path to your users JSON file

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
