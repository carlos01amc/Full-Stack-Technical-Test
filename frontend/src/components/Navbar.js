import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ setIsLoggedIn, isLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Smartex</Link>
            {isLoggedIn ? (
                <div>
                    <Link to="/user" className="dashboard-button">User Dashboard</Link>
                    <Link to="/" onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> 
                    </Link>
                </div>
            ) : (
                <div className="user-icon">
                    <Link to="/login" className="link">
                        <FaUser size={24} />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
