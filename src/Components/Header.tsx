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
    </header>
  );
};

export default Header;
