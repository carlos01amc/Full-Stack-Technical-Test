// App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "./pages/UserDashboard";
import GuestDashboard from './pages/GuestDashboard';
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from "./pages/Register";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<GuestDashboard />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={isLoggedIn ? <UserDashboard /> : <GuestDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
