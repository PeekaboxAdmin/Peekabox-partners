import React, { useState } from 'react';
import Dropdown from '../../Components/Dropdown/Dropdown';
import './Language.css';
import Heading from '../../Components/Heading/Heading';

interface LanguageSetting {}

const LanguageItem: React.FC<LanguageSetting> = () => (
  <div className="Language-item">
    <div className="Language-item-details"></div>
  </div>
);

const LanguageSettings: React.FC = () => {
  const [language, setLanguage] = useState('');
  const [Timezone, setTimezone] = useState('');

  return (
    <>

      
      <Heading titleClassName='notification-header' title="Language" subtitle=''  />
      <div className="Language-container">
        <div className="Language-content">
        
         
            <label className="dropdown-label" htmlFor="Language">
              Language Preference
            </label>
            <div className="dropdown-container">
            <Dropdown
              selectedOption={language}
              options={['English', 'Spanish', 'French']}
              onSelect={setLanguage}
              placeholder="Select Language"
              dropdownType="General" 
            />
          </div>

       
          
            <label className="dropdown-label" htmlFor="Timezone">
              Timezone
            </label>
            <div className="dropdown-container">
            <Dropdown
              selectedOption={Timezone}
              options={['English', 'Spanish', 'French']}
              onSelect={setTimezone}
              placeholder="Select Timezone"
              dropdownType="timezone" 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSettings;
