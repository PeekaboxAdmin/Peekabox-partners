import React, { useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Import the bell icon
import { faSearch, faGlobe, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import MobileSidebar from './SideBarMobile';
import { useState } from 'react';

const Header: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // This function now ONLY moves the toggle, without changing the page
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="mainheader">
      <div className="header-content">
        <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
        <div className="logoheader">
          <span className="logo-text">PEEKABOX</span>
        </div>

        <nav className="nav-links">
          <Link to="/products" className="nav-item">Product</Link>
        {/*  <Link to="/notifications" className="nav-item">Notifications</Link> */}
          <Link to="/faqs" className="nav-item">FAQs</Link>
        </nav>
      </div>

    <div className="header-right">
       {/* <div className="search-container-header">
          <FontAwesomeIcon icon={faSearch} className="search-icon-header" />
          <input type="text" placeholder="Search" className="search-input-header" />
        </div> 

        <div className="language-selector">
          <select className="language-dropdown">
            <option>English (United Kingdom)</option>
            <option>العربية</option>
            <option>Français</option>
          </select>
        </div> */}

        {/* Dark Mode Toggle - Ensures it stays inside the flexbox */}
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          <div className={`toggle-switch ${darkMode ? "dark" : ""}`}>
            <div className="toggle-knob"></div>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
