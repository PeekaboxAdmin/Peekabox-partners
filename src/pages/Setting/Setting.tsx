import React from 'react';

import NotificationSettings from '../../Sections/Notification/Notification';
import LanguageSettings from '../../Sections/Language/Language';
import PrivacySettings from '../../Sections/Privacy/Privcay';
import Button from '../../Components/Button/Button';
import './Setting.css';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import { useState } from 'react';

const Setting: React.FC = () => {

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};

  return (
    <div className="Settings-container-m">
      <Header/>
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
    <div className="Settings-container">
      <div className="title-left">Settings</div>
      
      <NotificationSettings />
      <div className="separator-line" /> 

      <PrivacySettings />
      <div className="separator-line" /> 

      <LanguageSettings />
      <div className="button-container">
        <Button label="Cancel" className="white-button" />
        <Button label="Save" className="bink-button" />
      </div>
    </div>
    </div>
  );
};

export default Setting;
