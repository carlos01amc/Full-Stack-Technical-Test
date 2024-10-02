# Full Stack Technical Test

This project is a user dashboard application with authentication (login, registration) and product management functionality. Users can view, add, edit, and delete products once logged in. The project includes a guest dashboard for non-logged-in users to view available products and a users dashboard.

## Features

- User Authentication (Login/Register with JWT)
- User Dashboard for product management (Add, Edit, Delete)
- Guest Dashboard for product browsing
- Responsive design
- Filter products by name or category in User Dashboard
- Protected routes based on login status

## Technologies Used

- **Frontend**: React (with React Router), Axios, CSS
- **Backend**: Node.js, Express, bcrypt for password hashing, JWT for authentication
- **Database**: JSON files for storing users and products (can be extended to use a proper database)

## Setup Instructions

### Backend

1. Clone the repository and navigate to the backend folder.
2. Run `npm install` to install all dependencies.
3. Start the server using:
   
   ```bash
   node server.js
4. The server will run on http://localhost:3000

### Frontend

1. Navigate to the frontend folder.
2. Run npm install to install all dependencies.
3. Start the frontend
   
   ```bash
   node start
4. The frontend will run on http://localhost:3001

## Routes
### API Endpoints
- POST /register: Register a new user.
- POST /login: Log in with email and password.
- GET /products: Get all products.
- POST /products: Add a new product (user must be logged in).
- PUT /products/:id: Edit an existing product.
- DELETE /products/:id: Delete a product.

### Frontend
- / : Guest dashboard (view products without logging in).
- /login: User login page.
- /register: User registration page.
- /user: User dashboard (view, add, edit, delete products)
