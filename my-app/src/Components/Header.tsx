import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="mainheader">
      {/* Logo or Icon */}
      <div className="logo">
        <span className="logo-text">Peekabox</span>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-item">About US</a>
        <a href="#" className="nav-item">Notification</a>
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
