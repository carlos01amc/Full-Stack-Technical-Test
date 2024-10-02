import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "./pages/UserDashboard";
import GuestDashboard from './pages/GuestDashboard';
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from "./pages/Register";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check if the token exists
        if (token) {
            setIsLoggedIn(true); // User is logged in
        }
    }, []);

    return (
        <Router>
            <div>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn and setIsLoggedIn */}
                <Routes>
                    <Route path="/" element={<GuestDashboard />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/user" element={isLoggedIn ? <UserDashboard /> : <GuestDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
