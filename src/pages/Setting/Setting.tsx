import React, { useState } from 'react';

import NotificationSettings from '../../Sections/Notification/Notification';
import PrivacySettings from '../../Sections/Privacy/Privcay';
import LanguageSettings from '../../Sections/Language/Language';
import PaymentDetails from '../../Sections/PaymentDetails';
import Button from '../../Components/Button/Button';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import '../../Components/Sidebar.css'
import { useNavigate } from 'react-router-dom';


const SettingsPage: React.FC = () => {

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const nav = useNavigate();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};
  return (

        <div className="max-w-6xl mx-auto px-4 py-4">

        <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

          <div className="bg-white rounded-lg border border-gray-200 p-2 md:px-28">

            <h1 className="text-2xl font-semibold mb-6 ml-1">Settings</h1>

          {/*   <NotificationSettings />
            <hr className="border-gray-200 my-8" /> */}

             <PrivacySettings />
            <hr className="border-gray-200 my-8" /> 

          {/*  <LanguageSettings /> // Not MVP FEATURE 
            <hr className="border-gray-200 my-8" /> */}

            <PaymentDetails />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                label="Save Changes"
                className="w-full sm:w-auto px-4 py-2 bg-pinkCustom text-white border-2 border-pinkCustom rounded-lg hover:bg-bg-pinkCustom hover:border-pinkCustom transition-colors"
              />
              <Button
                label="Cancel"
                onClick={()=> nav('/dashboard')}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-pinkCustom rounded-lg text-pinkCustom hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>

    );
};

export default SettingsPage;