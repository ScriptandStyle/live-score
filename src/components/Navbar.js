import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>Foot</span>Zone
          <i className="fas fa-futbol"></i>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/live-matches" className="nav-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-bolt"></i> Live Matches
          </Link>
          <Link to="/teams" className="nav-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-users"></i> Teams
          </Link>
          <Link to="/news" className="nav-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-newspaper"></i> News
          </Link>
          <Link to="/about" className="nav-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-info-circle"></i> About
          </Link>
          {isLoggedIn ? (
            <button className="nav-item auth-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-item" onClick={() => setIsOpen(false)}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/register" className="nav-item" onClick={() => setIsOpen(false)}>
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </>
          )}
        </div>
        
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;