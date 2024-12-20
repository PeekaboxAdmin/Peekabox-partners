import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Import the bell icon
import MobileSidebar from './SideBarMobile';
import { useState } from 'react';
const Header: React.FC = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};
  return (
    <header className="mainheader">
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar}/>
      {/* Logo or Icon */}
      <div className="logoheader">
        <span className="logo-text">Peekabox</span>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-item">About Us</a>
        <Link to="/notifications" className="nav-item">Notification</Link>
        <a href="#" className="nav-item">FAQ</a>
      </nav>

      {/* Notification bell for mobile view */}
      <div className="notification-bell">
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
