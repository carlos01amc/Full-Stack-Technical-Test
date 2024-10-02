import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaUser } from 'react-icons/fa'; 
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">Smartex</Link>
            <div className="user-icon">
                <Link to="/login" className="link">
                    <FaUser size={24} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
