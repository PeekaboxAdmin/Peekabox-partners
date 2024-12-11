import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="mainheader">
      {/* Logo or Icon */}
      <div className="logoheader">
        <span className="logo-text">Peekabox</span>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-item">About US</a>
        <Link to="/notifications" className="nav-item">Notification</Link>
        <a href="#" className="nav-item">FAQ</a>
      </nav>

      {/* Search bar */}
      <div className="search">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </header>
  );
};

export default Header;
