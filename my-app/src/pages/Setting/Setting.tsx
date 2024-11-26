import React from 'react';

import NotificationSettings from '../../Sections/Notification/Notification';
import LanguageSettings from '../../Sections/Language/Language';
import PrivacySettings from '../../Sections/Privacy/Privcay';
import Button from '../../Components/Button/Button';
import './Setting.css';

const Setting: React.FC = () => {
  return (
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
  );
};

export default Setting;
